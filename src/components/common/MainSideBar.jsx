import React from "react";
import { sideBarLinks } from "../../assets/navLinks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const MainSideBar = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("User in ManiSideBar:", user);
  return (
    <div>
      <Outlet />
      <div className="absolute left-0 h-full w-auto px-4 bg-slate-500">
        <ul>
          {sideBarLinks.map((link, index) =>
            (link.path === "/dashboard/pending-approvals" ||
              link.path === "/dashboard/approval-list") &&
            user?.role !== "admin" ? (
              <li key={index}></li>
            ) : (
              <li key={index} className="text-white text-lg">
                <Link to={link.path}>{link.title}</Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainSideBar;
