import React from "react";
import { Link } from "react-router-dom";

const Profile = (user) => {
  const { name, image, role, memberAccount } = user.user;
  const { balance, expense, deposit } = memberAccount;

  return (
    <div>
      <div className="w-[75%] m-auto border-2 border-gray-200 rounded">
        <div
          className="flex items-center justify-start
         rounded-md p-5 gap-4"
        >
          <img
            src={image}
            width={65}
            height={65}
            alt="Website  Logo"
            className="rounded-full"
          />

          <span className="mx-1 text-blue-500 font-semibold">
            {name} <br /> {role}
          </span>

          <div className="flex justify-center items-center gap-5">
          <h4 className="text-xl font-semibold text-green-500">Deposit:₹{deposit}</h4>
            <h4 className="text-xl font-semibold text-red-600">Expense:₹{expense}</h4>
            <h4 className="text-xl font-semibold text-blue-500"> Balance:₹{balance}</h4>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Profile;
