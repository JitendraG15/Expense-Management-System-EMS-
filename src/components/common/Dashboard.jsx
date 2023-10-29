// import React, { useEffect } from "react";
import NavigationBar from "./NavigationBar";
import MainSideBar from "./MainSideBar";
import { useSelector } from "react-redux";

// import { auth } from "../../../server/middlewares/auth";
const Dashboard = () => {
 const {user} = useSelector((state)=>state.auth);
  return (
    <div>
      <div className="flex flex-col">
        <NavigationBar user={user} />
        <div>
          <MainSideBar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
