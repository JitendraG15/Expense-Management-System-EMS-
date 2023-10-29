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

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div>
        {/* <NavigationBar user={user} /> */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route  element={<Dashboard/>} path="/dashboard">
            <Route element={<MemberProfiles />} path="/dashboard/member-profiles" />
            <Route element={<MemberProfile/>} path="/dashboard/member-profile" />
            <Route element={<MyExpenses />} path="/dashboard/my-expenses" />
            <Route element={<ApprovalList />} path="/dashboard/approval-list" />
            <Route
              element={<PendingApprovals />}
              path="/dashboard/pending-approvals"
            />
            <Route element={<AddTransaction />} path="/dashboard/add-new-transaction" />
          </Route>

          <Route element={<SignUp />} path="/signup" />

          <Route element={<SuccessSignup />} path="/signup-success" />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
