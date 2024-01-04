import React from "react";
import NavigationBar from "./NavigationBar";
import MainSideBar from "./MainSideBar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);



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
