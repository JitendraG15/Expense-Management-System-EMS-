import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Expense from "../components/core/Expense";
import { getMemberProfile } from "../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MemberProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token, user } = useSelector((state) => state.auth);
  // const { transactions } = useSelector((state) => state.transaction);
  // const {memberAccount} = user;
  const { name, email, role, image, mobile, memberAccount } = user;
  const { balance, expense, deposit , transactions} = memberAccount;

  useEffect(() => {
    dispatch(getMemberProfile(token,navigate)); 
    console.log("User:",user);
    
  }, []); 

  return (
    <div className=" absolute left-[25%]   -z-10  m-auto p-4">
      <h1 className="font-semibold text-2xl mb-3 p-2">My Profile</h1>
      <div className="flex flex-col items-start justify-center ">
        {/* Item 1 */}
        <div className="flex flex-col items-start">
          <h4 className="font-semibold text-lg p-2">Personal Details</h4>
          <div className="w-full mt-4 mb-4 h-1 bg-gray-400"></div>
          <div className="flex gap-10 justify-center items-center">
            <img
              src={image}
              alt="ProfileImage"
              width={200}
              height={200}
              className="rounded-full"
            />

            <div className="text-lg font-semibold">
              <h3>{name}</h3>
              <p>{email}</p>
              <p>{mobile}</p>
              <span>{role}</span>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-start mt-10">
          <h4 className="font-semibold text-lg p-2">Account Summary</h4>
          <div className="w-full mt-4 mb-4 h-1 bg-gray-400"></div>
          <div className="flex gap-10 justify-center items-center">
            <div className="flex flex-col justify-center items-center border-r-gray-600">
              <span className="font-semibold text-lg">Account Holder Name</span>
              <span>{name}</span>
            </div>

            <div className="flex flex-col justify-center items-center border-r-gray-600">
              <span className="font-semibold text-lg">Deposit</span>
              <span>₹{deposit}</span>
            </div>

            <div className="flex flex-col justify-center items-center border-r-gray-600">
              <span className="font-semibold text-lg">Expense</span>
              <span>₹{expense}</span>
            </div>

            <div className="flex flex-col justify-center items-center border-r-gray-600">
              <span className="font-semibold text-lg">Current Balance</span>
              <span>₹{balance}</span>
            </div>
          </div>
        </div>

        {/* Item 3 */}

        <div className="flex flex-col items-start mt-10">
          <h4 className="font-semibold text-lg p-2">Expense History</h4>
          <div className="w-full mt-4 mb-4 h-1 bg-gray-400"></div>
          <div className="flex flex-col justify-center items-start">
            {transactions.length >0 ? transactions.map((transaction, index) => (
              <>
                <Expense transaction={transaction} key={index} />
              </>
            )):<p className="text-sm pl-3">No Expenses Yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
