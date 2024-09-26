
import CustomNavLink from "@/Pages/Shared/Navbar/CustomNavLink";
import Navbar from "@/Pages/Shared/Navbar/Navbar";
import {  Outlet } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = true;
  return (
    <div>
      <div className="bg-[#07332f] ">
        <Navbar></Navbar>
      </div>
      <div className="max-w-screen-xl mx-auto ">
      <div className="flex">
        <div className="w-64 min-h-screen bg-cyan-500">
          <ul className="menu  p-4">
            {isAdmin ? (
              <>
              
              <li>
                <CustomNavLink to="/dashboard/allUsers">
               All Users
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/dashboard/AddDoctor">
               Add a Doctor
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/dashboard/manageDoctors">
               Mange Doctors
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/dashboard/adminHome">
                Home
                </CustomNavLink>
              </li>
              
              </>
            ) : (
              <>
                <li>
                  <CustomNavLink to="/ambulance">Ambulance</CustomNavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex-1 p-8">
            <Outlet></Outlet>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
