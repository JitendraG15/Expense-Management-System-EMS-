const Member = require("../models/Member");
const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
// const nodemailer = require("nodemailer");
const mailSender = require("../utils/mailSender");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Handler For signup
exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword, role } = req.body;
    // console.log(name, email, mobile, password, confirmPassword);

    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are mandatory. Please fill all the details carefully.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password And confirm Password do not match.",
      });
    }

    const isExistingMember = await Member.findOne({ email });
    if (isExistingMember) {
      return res.status(402).json({
        success: false,
        message: "User already exists. You may login.",
      });
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nameArray = name.split(" ");

    const member = await Member.create({
      name: name,
      email: email,
      password: hashedPassword,
      mobile: mobile,
      image: `https://api.dicebear.com/5.x/initials/svg?seed= ${nameArray[0]} ${nameArray[1]}`,
      role: role ? role : "member",
    });

    const memberAccount = await Account.create({
      accountHolder: member._id,
    });

    member.memberAccount = memberAccount;
    // console.log("Member Without Account: ",member);
    member.save();

    // Sending Mail To new user
    const result = mailSender(
      email,
      "Congratulations! We welcome you as a new Member",
      `Thank You for signing with us. You are now a member.`
    );

    return res.status(200).json({
      success: true,
      member,
      message: "Registration success!.",
    });
  } catch (error) {
    // console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        "Unknown error occured during member registration. Please try again later.",
    });
  }
};


// Handler for Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email)
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the mandatory details carefully.",
      });
    }

    const user = await Member.findOne({ email })
      .populate({
        path: "memberAccount",
        populate: {
          path: "transactions",
        },
      })
      .exec();
    // console.log(user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not a valid member. Please signup first.",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // member.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // res.cookie('user', JSON.stringify({ id: member._id, email: member.email }));

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while logging in",
    });
  }
};


// Handler for Sending OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log("Email:", email);

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // console.log("otp:", otp);

    const result = mailSender(
      email,
      "Verify OTP",
      `Your one time password is ${otp}`
    );
    // console.log("Result:", result);
    if (result) {
      return res.status(200).json({
        success: true,
        email,
        result,
        otp,
        message: "OTP SENT SUCCESSFULLY.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while sending the otp.",
    });
  }
};
