import React from "react";
import Dashboard from "./components/common/Dashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

import MemberProfiles from "./pages/MemberProfiles";
import MyExpenses from "./pages/MyExpenses";
import ApprovalList from "./pages/ApprovalList";
import SuccessSignup from "./pages/SuccessSignup";
import AddTransaction from "./pages/AddTransaction";
import PendingApprovals from "./pages/PendingApprovals";
import SignUp from "./pages/SignUp";
import { useSelector } from "react-redux";
import MemberProfile from "./pages/MemberProfile";
import AddMoney from "./pages/AddMoney";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.profile);
  return (
    <div>
    <div className="scrolling-text text-white  font-semibold text-2xl">
     Desktop Mode Only!
    </div>
      <div className="mobile-only font-roboto">
        <div>
          {/* <NavigationBar user={user} /> */}

          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Dashboard />} path="/dashboard">
              <Route element={<MemberProfiles />} index />
              <Route
                element={<MemberProfile />}
                path="/dashboard/member-profile"
              />
              <Route element={<MyExpenses />} path="/dashboard/my-expenses" />
              <Route
                element={<ApprovalList />}
                path="/dashboard/approval-list"
              />
              <Route
                element={<PendingApprovals />}
                path="/dashboard/pending-approvals"
              />
              <Route
                element={<AddTransaction />}
                path="/dashboard/add-new-transaction"
              />

              <Route
                element={<AddMoney users={users} />}
                path="/dashboard/depositAmount"
              />
            </Route>

            <Route element={<SignUp />} path="/signup" />

            <Route element={<SuccessSignup />} path="/signup-success" />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
