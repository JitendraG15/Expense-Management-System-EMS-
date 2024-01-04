import React from "react";
// import { useState } from "react";

const Expense = (transaction1, key) => {
  // const { index } = key;
  const { transaction } = transaction1;
  const {  itemNames, membersInvolved, expense, date } = transaction;

  return ( 
    <div>
      <div className="border-gray-200 border-2 flex p-2 m-2 gap-8 rounded">
        <div className="text-black  flex flex-col justify-center items-center p-1 ">
          <span className="font-semibold">Items Purchaged</span>
          <span><ul className="flex gap-1 justify-center items-center">
            {
              itemNames.map((item)=>{return <>
                <span className="text-red-300 font-semibold text-[10px]">◍</span>  <li>{item}</li>
              </>  })
            }
          </ul></span>
        </div>

        <div className="text-black  flex flex-col justify-center items-center p-1 ">
          <span className="font-semibold">Members</span>
          <span><ul className="flex gap-1 justify-center items-center">
            {
              membersInvolved.map((member)=>{return <>
               <span className="text-green-300 font-semibold text-[10px]">◍</span> <li>{member.split(" ",1)}</li>
              </>  })
            }
          </ul></span>
        </div>

        <div className="text-black  flex flex-col justify-center items-center p-1 ">
          <span className="font-semibold">Total Expense</span>
          <span>{expense}</span>
        </div>

        <div className="text-black  flex flex-col justify-center items-center">
          <span className="font-semibold">Date</span>
          <span>{date.split("T", 1)}</span>
        </div>
      </div>
    </div>
  );
};

export default Expense;
