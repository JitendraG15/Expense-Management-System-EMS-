import React from 'react'
import MainSideBar from '../components/common/MainSideBar';
import { useSelector } from 'react-redux';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {getAllApprovedTransaction} from "../services/api";
import Expense from "../components/core/Expense";


const ApprovalList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const {approvedTransaction} = useSelector((state)=>state.transaction);
//  console.log("Sort:", approvedTransaction.sort((a,b)=>new Date(a.date) - new Date(b.date)));

  useEffect(()=>{
  dispatch(getAllApprovedTransaction(token,navigate));
   console.log("AT:",approvedTransaction);
  },[]);

  return (
    <div>
    <MainSideBar/>
    <div className='absolute left-[20%] h-full w-[70%] mt-2 z-10'>
        <h1 className='text-2xl p-2 font-semibold'>Approved Transactions</h1>
        <div className='w-[100%] m-auto'>
            {
             approvedTransaction.length > 0?( approvedTransaction.map((transaction,index)=>(
                <>
                <Expense transaction={transaction} key={index}/>
                </>
              )) ):(<p className="text-xl p-3">No Approved Transactions To Show</p>)
            }
        </div>
    </div>
    
  </div>
  )
}

export default ApprovalList
