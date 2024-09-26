

import logo from "../../../assets/logo/logo.png";
import { IoMenuOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import CustomNavLink from "./CustomNavLink";
const Navbar = () => {

  const {user, logOut} = useContext(AuthContext)
  const handleLogOut= ()=>{
    logOut()
    .then(()=>{console.log('logout')})
    .catch((error)=>console.log('logOut', error))
  }
  
  const navLinks = (
    <div className=" lg:static absolute left-0 top-5 w-full flex flex-col lg:flex-row justify-center items-center  gap-5">
      <li className="" >
        <CustomNavLink  to="/">Home</CustomNavLink>
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
      <li>
        <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>
      </li>

      <li>

        <CustomNavLink to="/about">About</CustomNavLink>
      </li>
      
      {
        user?  <button onClick={handleLogOut} className="btn btn-ghost">Log out</button>
        :  <li>
        <CustomNavLink to="/login">Login</CustomNavLink>
      </li>
      }
    </div>
  );

  return (
    <div className="navbar max-w-screen-xl mx-auto  ">
      <div className="navbar-start  p-8  ">
        <div className="flex items-center gap-1">
          <img className="h-14" src={logo} alt="" />
        </div>
      </div>

      <div className="navbar-end ">
        <div className="hidden lg:flex">
          <ul className="menu  menu-horizontal px-1 text-[#1dc753] font-bold">
            {navLinks}
          </ul>
        </div>

        {/* drawer */}
        <div className="lg:hidden">
          <div className="drawer drawer-end z-10">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className="btn  drawer-button "
              >
                <IoMenuOutline />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu relative lg:static bg-blue-300 text-base-content min-h-screen w-1/3 p-4">
                {navLinks}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
