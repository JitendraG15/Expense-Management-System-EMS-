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
      <div className="-z-10 absolute left-[5%]  mt-2 w-full">
        <div className="w-[70%] m-auto">
          <h1 className="font-semibold text-2xl p-2">My Expenses</h1>
          <div>
               {
               transactions.length > 0 ? transactions.map((transaction, index)=>(
                  <>
                   <Expense transaction={transaction} key={index}/>
                  </>
                )) : <p className="text-xl p-3">No Expenses To Show</p>
               } 
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MyExpenses;
