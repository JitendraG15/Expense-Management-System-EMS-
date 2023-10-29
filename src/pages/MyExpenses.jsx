import React, { useEffect } from "react";
import MainSideBar from "../components/common/MainSideBar";
import { getMyTransactions } from "../services/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import Expense from "../components/core/Expense";


const MyExpenses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {token} = useSelector((state)=>state.auth);
const {transactions} = useSelector((state)=>state.transaction);
console.log("Transactions2:",transactions);


  useEffect(()=>{
    dispatch(getMyTransactions(token, navigate));
  },[])

  return (
    <div>
      <MainSideBar />
      <div className="z-10 absolute left-[5%]  mt-2 w-full">
        <div className="w-[70%] m-auto bg-gray-200 border-black border-2 px-10 p-5">
          <h1 className="text-black font-bold text-xl">My Expenses</h1>
          <div>
               {
                transactions.map((transaction, index)=>(
                  <>
                   <Expense transaction={transaction} key={index}/>
                  </>
                ))
               } 
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MyExpenses;
