import logo from "../../../assets/logo/logo.png";
import { IoMenuOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import CustomNavLink from "./CustomNavLink";
import { FaUserCircle } from "react-icons/fa";

import {  IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
const Navbar = () => {
  const { user, userData, logOut } = useContext(AuthContext);
  const [toggle, setToggle ] = useState(false)
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("logout");
      })
      .catch((error) => console.log("logOut", error));
  };
const handleToggle = ()=>[
  setToggle(!toggle)
]
  const userLinks = (
    <div className=" space-y-3">
      
      {
        userData?.role === 'patient' ?  <li className=" rounded-lg  !bg-green-500">
        <CustomNavLink to="/dashboard">profile</CustomNavLink>
      </li> :  <li className=" rounded-lg  !bg-green-500">
        <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>
      </li> 
      }
      <div className="divider"></div>

      {user && (
        <button onClick={handleLogOut} className=" hover:text-blue-500 font-medium flex items-center gap-3">
     <CiLogout size={20} /> <span className="">Log out</span>
    </button>
      )}
    </div>
  );

  const navLinks = (
    <div className=" lg:static absolute left-0 top-5 w-full flex flex-col lg:flex-row justify-center items-center  gap-5 ">
      <li className="">
        <CustomNavLink to="/">Home</CustomNavLink>
      </li>
      <li className="">
        <CustomNavLink to="/clinics">Clinics</CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/pharmacy">Pharmacy</CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/doctors">Doctor</CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/ambulances">Ambulance</CustomNavLink>
      </li>

     

      {!user && (
        <li>
          <CustomNavLink to="/login">Login</CustomNavLink>
        </li>
      )}
    </div>
  );

  return (
    <div className="navbar max-w-screen-xl mx-auto  ">
      <div className="navbar-start  p-8  ">
        <div className="hidden lg:flex ">
          <img className="h-14" src={logo} alt="" />
        </div>
        {/* drawer */}
        <div className="lg:hidden">
          <div className="drawer  z-10">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label htmlFor="my-drawer-2" className="btn  drawer-button ">
                <IoMenuOutline />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className=" lg:static bg-blue-300 text-base-content h-full w-3/4 md:w-1/2 ">
                <div className="flex justify-center items-center gap-1">
                  <img className="h-14 mt-5" src={logo} alt="" />
                </div>
                <span className="menu relative lg:static ">{navLinks}</span>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-middle  p-8  ">
        <div className="flex lg:hidden items-center gap-1">
          <img className="h-14" src={logo} alt="" />
        </div>
        <div className="hidden lg:flex">
          <ul className="text-black font-bold flex lg:flex-col gap-10  flex-wrap justify-center  items-center  p-4">
            {navLinks}
          </ul>
        </div>
      </div>
      <div className="navbar-end md:space-x-2">
      <div className="flex gap-5 items-center justify-center">
        <div className="text-white">
          hi {userData?.name ? userData.name : "Unknown"}
        </div>
        <div>
          {userData?.image ? (
            <img
              className="h-10 w-10 rounded-full bg-orange-300"
              src={userData?.image}
              alt="profile pic"
            />
          ) : (
            <p>
              <FaUserCircle className="h-10 w-10 text-orange-300" />
            </p>
          )}
        </div>
      </div>
      {
        user && <div className="dropdown dropdown-end ">
        <div tabIndex={0} className="text-white" onClick={handleToggle}>
          {toggle ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
        </div>

        {toggle && (
          <ul
            tabIndex={0}
            className="dropdown-content absolute top-10 right-4 menu bg-[#f1f5f9] shadow-lg p-5 rounded-box z-[1]  text-black w-56 "
          >
            

            <div className="pt-2 pb-2 pr-4 pl-4 ">
              
              <div className="mt-20">{userLinks}</div>
            </div>
          </ul>
        )}
      </div>
      }
      
    </div>
    </div>
  );
};

export default Navbar;
