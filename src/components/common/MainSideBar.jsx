import React from "react";
import { sideBarLinks } from "../../assets/navLinks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const MainSideBar = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("User in MainSideBar:", user);
  return (
    <div>
      <Outlet />
      <div className="from-slate-200 absolute left-0  w-auto h-full px-4 bg-gray-200 py-1 border-r-gray-500 border-r-4">
        <ul>
          {sideBarLinks.map((link, index) =>
            (link.path === "/dashboard/pending-approvals" ||
              link.path === "/dashboard/approval-list" ||
              link.path === "/dashboard/depositAmount") &&
            user?.role !== "admin" ? (
              <li key={index}></li>
            ) : (
              <li key={index} className="text-black text-lg p-1 hover:bg-gray-300 m-2  rounded-md font-semibold">
                <Link to={link.path} className="px-2">
                {link.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainSideBar;
