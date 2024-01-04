import React, { useState } from "react";
import { approve, reject } from "../../services/api.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const PendingTransaction = (transactions) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transaction } = transactions;
  console.log("Transa:", transaction);
  const { token } = useSelector((state) => state.auth);
  const [id, setID] = useState("");
  const { createdBy, itemNames, membersInvolved, expense, date } = transaction;
  console.log("Details:", createdBy, itemNames, membersInvolved, expense, date);

  function handleOnApproveClick(e) {
    dispatch(approve(transaction, token, navigate));
    setID(transaction);
    window.location.reload();
  }

  function handleOnRejectClick(e) {
    dispatch(reject(transaction, token, navigate));
    window.location.reload();
  }

  return (
    <div>
      <div className="flex  bg-white p-4 border-2 border-b-neutral-300 gap-8 rounded">
        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold">Added By</span>
          <span>{createdBy.name}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold">Items Purchaged</span> 
          <span><ul className="flex gap-1 justify-center items-center">
            {
              itemNames.map((item)=>{return <>
                <span className="text-red-300 font-semibold text-[10px]">◍</span>  <li>{item}</li>
              </>  })
            }
          </ul></span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold">Members Involved</span>
          <span><ul className="flex gap-1 justify-center items-center">
            {
              membersInvolved.map((member)=>{return <>
               <span className="text-green-300 font-semibold text-[10px]">◍</span> <li>{member.split(" ",1)}</li>
              </>  })
            }
          </ul></span>
        </div>

        <div className="flex  flex-col justify-center items-center">
          <span className="font-semibold">Amount</span>
          <span>{expense}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold">Date</span>
          <span>{date.split("T", 1)}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold">Take Action</span>
          <span className="flex gap-2">
            <button
              onClick={handleOnApproveClick}
              className="bg-green-600 text-white p-1 rounded-md font-semibold  hover:bg-green-500 hover:scale-105"
            >
              Approve
            </button>
            <button
              onClick={handleOnRejectClick}
              className="bg-red-600 text-white p-1 rounded-md font-semibold hover:bg-red-500 hover:scale-105"
            >
              Reject
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PendingTransaction;
