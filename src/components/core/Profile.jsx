import React from "react";
import { Link } from "react-router-dom";

const Profile = (user) => {
  const { name, image, role, memberAccount } = user.user;
  const { balance, expense } = memberAccount;

  return (
    <div>
      <div className="w-[75%] m-auto ">
        <div
          className="bg-white flex items-start justify-center
         rounded-md p-5"
        >
          <img
            src={image}
            width={65}
            height={65}
            alt="Website  Logo"
            className="rounded-full"
          />

          <span className="mx-3 text-blue-500">
            {name} <br /> {role}
          </span>

          <div className="flex justify-center items-center gap-5">
            <h4 className="text-xl text-red-600">Expense:{expense}</h4>
            <h4 className="text-xl text-blue-500"> Balance:{balance}</h4>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Profile;
