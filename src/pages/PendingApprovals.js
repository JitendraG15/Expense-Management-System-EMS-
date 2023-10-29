import React from "react";
import MainSideBar from "../components/common/MainSideBar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchPendingTransactions } from "../services/api";
import PendingTransaction from "../components/core/PendingTransaction";

const PendingApprovals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { pendingTrans } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchPendingTransactions(token, navigate));
    
  }, ["profile"]);

  return (
    <div>
      <MainSideBar />
      <div className="z-10 absolute left-[20%] h-full w-auto mt-2">
        <h1 className="m-4 font-semibold text-xl">Pending Approvals</h1>
        {pendingTrans.length > 0 ? (
          <div className="pl-3">
            {pendingTrans.map((transaction, index) => {
              return (
                <div key={index}>
                  <PendingTransaction transaction={transaction} />
                </div>
              );
            })}
          </div>
        ) : (
          <p>No Pending Transactions To Show</p>
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;
