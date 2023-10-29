import React from "react";
import { useState } from "react";

const Expense = (transaction1, key) => {
  const {index} = key;
  const { transaction } = transaction1;
  const { createdBy, itemNames, membersInvolved, expense, date } = transaction;
  
  return (
    <div>
      <div className="bg-white border-2 border-red-600 flex p-2 m-2">

      

        <div className="text-black  flex flex-col justify-center items-center p-1 border-r-2">
          <span className="font-semibold">Creator</span>
          <span>{createdBy?.name}</span>
        </div>

        <div className="text-black  flex flex-col justify-center items-center p-1 border-r-2">
          <span className="font-semibold">Items Purchaged</span>
          <span>{itemNames[0]}</span>
        </div>



        <div className="text-black  flex flex-col justify-center items-center p-1 border-r-2">
          <span className="font-semibold">Members</span>
          <span>{membersInvolved[0]}</span>
        </div>



        <div className="text-black  flex flex-col justify-center items-center p-1 border-r-2">
          <span className="font-semibold">Total Expense</span>
          <span>{expense}</span>
        </div>


        <div className="text-black  flex flex-col justify-center items-center">
          <span className="font-semibold">Date</span>
          <span>{date.split("T",1)}</span>
        </div>


       
      </div>
    </div>
  );
};

export default Expense;
