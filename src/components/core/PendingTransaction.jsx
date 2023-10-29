import React, { useState } from 'react'
import {approve, reject} from "../../services/api.js";
import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";

const PendingTransaction = (transactions) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {transaction} = transactions;
    console.log("Transa:",transaction);
    const {token} = useSelector((state)=>state.auth);
    const [id, setID] = useState("");
   const {createdBy,itemNames,membersInvolved,expense,date  } = transaction;
   console.log("Details:",createdBy,itemNames,membersInvolved,expense,date);
 
   function handleOnApproveClick(e){
     dispatch(approve(transaction,token,navigate));
     setID(transaction);
   }

   function handleOnRejectClick(e){
    dispatch(reject(transaction,token,navigate));
   }


  return (
    <div>
      <div className='flex flex-col bg-white p-4 border-2 border-b-neutral-300'>
        <div className='flex gap-20 '>
        <span>Added By</span>
        <span>Items Purchaged</span>
        <span>Members Involved</span>
        <span>Amount</span>
        <span>Date</span>
        <span>Take Action</span>
        </div>

        <div className='flex gap-20 '>
        <span>{createdBy.name}</span>
        <span>{itemNames[0]}</span>
        <span>{membersInvolved[0]}</span>
        <span>{expense}</span>
        <span>{date.split("T",1)}</span>
        <span className='flex gap-2'>
        <button onClick={handleOnApproveClick} className='bg-green-600 text-white p-1 rounded-md font-bold'>Approve</button>
        <button  onClick={handleOnRejectClick} className='bg-red-600 text-white p-1 rounded-md font-bold'>Reject</button>
        </span>
        </div>
      </div>
    </div>
  )
}

export default PendingTransaction
