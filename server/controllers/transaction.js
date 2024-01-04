// const { AccountTree } = require("@mui/icons-material");
const Account = require("../models/Account");
const Member = require("../models/Member");
const Transaction = require("../models/Transaction");

// const nodemailer = require("nodemailer");
const mailSender = require("../utils/mailSender");
const MoneyDepositNotification = require("../mail/MoneyDeposit");
const NewTransactionNotificationAdmin = require("../mail/NewTransactionNotificationAdmin");
const NewTransactionNotificationInitiator = require("../mail/NewTransactionNotificationInitiator");
const NewTransactionNotificationMember = require("../mail/NewTransactionNotificationMember");
const NewTransactionReplyBack  = require("../mail/NewTransactionReplyBack");
const TransactionRejectMail = require("../mail/TransactionRejectMail");

// Handler To Add A New Transaction
exports.addTransaction = async (req, res) => {
  try {
    // 1. get the required data from request body and validate
    const { itemNames, membersInvolved, expense, purchagedBy } = req.body;
    console.log(
      "Data Entered by Member : ",
      itemNames,
      membersInvolved,
      expense,
      purchagedBy
    );

    if (!itemNames || !membersInvolved || !expense || !purchagedBy) {
      return res.status(400).json({
        success: false,
        message: "Pls! Fill All The Required Fields Carefully.",
      });
    }

    // 2. get member reference from token/cookie and authenticate

    const user = await Member.findById(purchagedBy);
    console.log("Printing :", user);
    // const { name } = await Member.findById(user.id);
    // console.log("Name:", name);
    // const { email, role } = user;
    // console.log("Trasaction Created by : ", email, role);

    // 3. create Transaction Instance with the provided data
    const newItems = itemNames.split(" ");
    const newMembers = membersInvolved;
    const newTransaction = await Transaction.create({
      createdBy: user.id,
      itemNames: newItems,
      membersInvolved: newMembers,
      expense,
    });

    console.log("New Transaction Details : ", newTransaction);

    // 5. sending transaction approval request mail to the admin
    const admin_instance = await Member.findOne({ role: "admin" });
    console.log("Admin Details:", admin_instance);
    const admin_email = admin_instance.email;
    // console.log("User Email:", email);
    // Sending mail to the admin
    try {
      mailSender(
        admin_email,
        `New Transaction added by ${user.name}`,
        NewTransactionNotificationAdmin(user.name, itemNames, membersInvolved, expense)
       
      );

      mailSender(
        user.email,
        "Request Sent To The Admin Successfully",
        NewTransactionNotificationInitiator(user.name, itemNames, membersInvolved, expense)
       
      );

      return res.status(200).json({
        success: true,
        message: "Email Sent to the admin for Verification of Transaction.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error Sending mail to the admin for transaction approval.",
      });
    }
  } catch (err) {
    console.log(err);
    console.error(err);
    return res.status(500).json({
      success: false,
      message:
        "Server Side Error : can't create new trabsaction. Please try again later.",
    });
  }
};

// Get All Transaction of a Member
exports.getAllTransaction = async (req, res) => {
  try {
    // get user from req.user.id
    const userId = req.user.id;
    // console.log("UserId: ", userId);
    const user = await Member.findOne({ id: userId._id })
      .populate({
        path: "memberAccount",
        populate: {
          path: "transactions",
        },
      })
      .exec();
    // console.log("User: ", user);

    // fetch all transactions from user's transactions array
    const transactions = user.memberAccount.transactions;

    console.log(transactions);

    return res.status(200).json({
      success: true,
      transactions,
      message: "Transaction details fetched successfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    return res.status(500).json({
      success: false,
      message:
        "error occured while fetching user transactions. please try again later.",
    });
  }
};

exports.getAllApprovedTransaction = async (req, res) => {
  try {
    // fetch all transactions from user's transactions array
    const transactions = await Transaction.find({ status: "approved" })
      .populate("createdBy")
      .exec();

    // console.log(transactions);

    return res.status(200).json({
      success: true,
      transactions,
      message: "All Approved Transactions fetched successfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    return res.status(500).json({
      success: false,
      message:
        "error occured while fetching user transactions. please try again later.",
    });
  }
};

// Utility Function to insert new transaction to member account
async function updateMembersWithTransaction(members, transactionId) {
  try {
    // const memberIds = members.map((member) => member._id);

    const updatedMembers = await Member.find({ name: { $in: members } });
    console.log("Updated members:",updatedMembers);
    const accountIDs = updatedMembers.map((member) => member.memberAccount._id);
    const memberAccounts = await Account.find({ _id: { $in: accountIDs } });
    const updatePromises = memberAccounts.map(async (memberAccount) => {
      if (memberAccount) {
        // console.log("UMA:",updatedMember.memberAccount)
        memberAccount.transactions.push(transactionId);
        await memberAccount.save();
        return memberAccount;
      } else {
        console.log(
          "Member account is undefined for member with ID:",
          memberAccount._id
        );
        return null; // Skip this member or handle the error as needed
      }
    });
  } catch (error) {
    console.error("Error updating members:", error);
  }
}

// Handler to Add transaction to the included members in a particular expense
exports.approve = async (req, res) => {
  try {
    // get the transaction details from transaction id

    const { data } = req.body;
    const { _id } = data;

    let transaction2 = await Transaction.findById(_id);

    const {membersInvolved, itemNames, expense } = transaction2;

    //  Change it's status from pending to approved

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transaction2._id,
      { status: "approved" },
      { new: true }
    );

    // Get all the members involved in the transaction
    const members = updatedTransaction.membersInvolved;
    const updatedMembers = await Member.find({ name: { $in: members } });
    console.log("members Fetched: ", updatedMembers);

    // Function to insert the approved transaction to the all involved member's transactions array
    updateMembersWithTransaction(members, transaction2);

    // Distribute the amount between all the members involved in the particular transaction and update account balance of each member

    const random = expense / members.length;
    const partOfMember = Math.ceil(random) ;
    console.log("Part:", partOfMember);
    updatedMembers.forEach(async (member) => {
      try {
        // Fetch the member document from the database
        const foundMember = await Member.findById(member._id)
          .populate("memberAccount")
          .exec();
        // console.log("FM:", foundMember);
        if (!foundMember) {
          // console.log(`Member with ID ${member._id} not found.`);
          return; // Skip this member if not found
        }

        // Update the balance and expense fields
        // console.log("MemberAccount: ", foundMember.memberAccount);
        let { memberAccount } = foundMember;

      const updatedAccount =  await Account.findByIdAndUpdate(memberAccount._id, {
          expense: memberAccount.expense + partOfMember,
        },{new:true
        });

        updatedAccount.balance = updatedAccount.deposit - updatedAccount.expense;
       await updatedAccount.save();

        
      } catch (error) {
        console.error(`Error updating member ${member._id}:`, error);
      }
    });

    // Send a confirmation mail for approved transaction to the transaction initiator
    const initiatorId = transaction2.createdBy._id;
    // console.log("initiator ID: ", initiatorId);
    const initiator = await Member.findById(initiatorId);
    // console.log("Initiator: ", initiator);
    // console.log("Initialtor Email: ", initiator.email);
    const result = mailSender(
      initiator.email,
      "Congrats! Your Transaction Got Approved By Admin",
      NewTransactionReplyBack(initiator.name , itemNames, membersInvolved, expense, partOfMember)
    );

    updatedMembers.map(function (member) {
      if (member.email !== initiator.email) {
        const result2 = mailSender(
          member.email,
          `New Expense Added By ${initiator.name}`,
          NewTransactionNotificationMember(initiator.name, member.name,membersInvolved, itemNames, expense, partOfMember )
        );
      }
    });

    return res.status(200).json({
      success: true,
      transaction2,
      message: "Transaction approved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: true,
      message:
        "Error occured while approving the transaction. Please try again later.",
    });
  }
};

// Handler To reject a transaction
exports.reject = async (req, res) => {
  try {
    // 1. Get the transaction id
    const { data } = req.body;
    const { _id } = data;

    let transaction = await Transaction.findById(_id);
    // 2. change it's status from pending state to rejected state
    const rejectedTransaction = await Transaction.findByIdAndUpdate(
      transaction._id,
      { status: "rejected" },
      { new: true }
    );
    // transaction.status = "rejected";
    // console.log("rejected Transaction: ", rejectedTransaction);
    // 3. Get Transaction initiator id
    const initiatorId = transaction.createdBy._id;
    // console.log("initiator ID: ", initiatorId);
    const initiator = await Member.findById(initiatorId);
    // console.log("Initiator: ", initiator);
    // console.log("Initialtor Email: ", initiator.email);
    // 4. Send a mail to the initiator tellig him about rejection of the transaction
    const result = mailSender(
      initiator.email,
      "OOPS! Your Transaction Got Rejected By Admin.",
      TransactionRejectMail(initiator.name)
    );
    // 5. return response
    return res.status(200).json({
      success: true,
      message: "Transaction successfully rejected",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: true,
      message:
        "Error occured while rejecting the transaction. please try again later.",
    });
  }
};

exports.getAccountDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Member.findOne({ id: userId._id })
      .populate({
        path: "memberAccount",
        populate: {
          path: "transactions",
        },
      })
      .exec();

    const account = user.memberAccount._id;
    // console.log("Account:", account);

    const accountDetails = await Account.findById(account._id)
      .populate(["accountHolder", "transactions"])
      .exec();

    return res.status(200).json({
      success: true,
      userAccount: accountDetails,
      message: "API Success",
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error occured during fetching account details.",
    });
  }
};

exports.getPendingTransactions = async (req, res) => {
  try {
    const pendingTransactions = await Transaction.find({ status: "pending" })
      .populate({
        path: "createdBy",
        populate: {
          path: "memberAccount", // Populate the author reference inside the books array
        },
      })
      .exec();
    // console.log("Pending Transactions:", pendingTransactions);

    return res.status(200).json({
      success: true,
      pending: pendingTransactions,
      message: "Pending Transactions Fetched Successfully",
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error occured during fetching pending transactions.",
    });
  }
};

exports.depositAmount = async (req, res) => {
  try {
    // Get member instance and deposit amount
    const { accountID, amount } = req.body;
    const account = await Account.findByIdAndUpdate(accountID);

    // account.balance += Number(amount);
    account.deposit += Number(amount);
    await account.save();
    account.balance = account.deposit - account.expense;
    await account.save();

    const user = await Member.findById(account.accountHolder._id);
    // console.log(user);

    mailSender(
      user.email,
      "Money Deposited",
      MoneyDepositNotification(user.name,account.balance, amount)
    );
    // Return response
    console.log("Account:", account);
    return res.status(200).json({
      success: true,
      message: "Amount Added Successfully",
      account,
    });
  } catch (error) {
    console.log("Err:", error);
    return res.status(500).json({
      success: false,
      message: "Error Occured While Depositing Amount In Account",
    });
  }
};

exports.resetAccounts = async (req, res)=>{
  try{
     const {accountID} = req.body;

     await Account.findByIdAndUpdate({_id:accountID},{
      deposit:0,
      expense:0,
      balance:0
     })


     return res.status(200).json({
      success:true,
      message:"Account Reset Success"
     })

     

  }catch(error){
    console.log("Error:",error)
    return res.status(500).json({
      success:false,
      message:"Error Occured While Resetting Account"
    })
  }
}
