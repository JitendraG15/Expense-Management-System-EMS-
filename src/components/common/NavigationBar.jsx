import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/jk.png";
import { NavLinks } from "../../assets/navLinks";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { logout } from "../../services/api";
import { RiNotification4Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {getMemberProfile} from "../../services/api"

const NavigationBar = (userObj) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = userObj;


  function handleClick() {
    setIsHovered(!isHovered);
  }

  function handleLogoutClick() {
    setIsHovered(!isHovered);
    dispatch(logout(token, navigate));
  }

  function handleP() {
    setIsHovered(!isHovered);
  }

  useEffect(() => {
    dispatch(getMemberProfile(token,navigate)); 
    console.log("User in Navigation Bar:",user);
    
  }, []);




  return (
    <div className="sticky bg-blue-500 flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-10/12 max-w-maxContent items-center justify-between">
        <Link to={"/dashboard"}>
          <img src={logo} width={100} height={40} alt="ERR" className="p-3" />
        </Link>

        <nav>
          <ul className="flex relative">
            {NavLinks.map((link, index) => {
              return (
                <li
                  key={index}
                  className="px-5 text-white bold decoration-slate-300 font-semibold text-3xl pt-3"
                >
                  {link.title === "Add" ? (
                    <Link to={link?.path}>
                      {" "}
                      <AiOutlinePlusCircle />
                    </Link>
                  ) : link.title === "Balance" ? (
                    <span className="flex justify-center items-center ">
                      Balance:
                      {user?.memberAccount.balance > 0 ? (
                        <p className="px-1">{user?.memberAccount.balance}</p>
                      ) : (
                        <p className="bg-white text-red-500 px-1 rounded">
                          {user?.memberAccount.balance}
                        </p>
                      )}
                    </span>
                  ) : link.title === "Notification" ? (
                    <RiNotification4Line />
                  ) : link.title === "Profile" ? (
                    <Link to={"#"}>
                      <div className="relative">
                        <img
                          src={user?.image}
                          width={50}
                          height={50}
                          alt="ProfileLogo"
                          className="rounded-full"
                          onClick={handleClick}
                        />

                        {isHovered && (
                          <div className="absolute bg-gray-300 text-black z-[1000] rounded p-2 text-lg w-[150px] mt-1">
                            <ul>
                              <li>
                                <Link
                                  to={"/dashboard/member-profile"}
                                  onClick={handleP}
                                  className="hover:bg-gray-200 px-2 py-1 rounded"
                                >
                                  My Profile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={"/"}
                                  onClick={handleLogoutClick}
                                  className="hover:bg-gray-200 px-2 py-1 rounded"
                                >
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <Link to={link?.path}>Hello, {user?.role.toUpperCase()}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
