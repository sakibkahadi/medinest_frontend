
import useUser from "@/Hooks/useUser";
import CustomNavLink from "@/Pages/Shared/Navbar/CustomNavLink";
import Navbar from "@/Pages/Shared/Navbar/Navbar";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import {  Outlet } from "react-router-dom";

const Dashboard = () => {
 
 const [users, loading, refetch ] = useUser()
 const {user: logInUser} = useContext(AuthContext)
 
 const checking = users.find(user=>user.email === logInUser?.email)

 
  return (
    <div>
      <div className="bg-[#07332f]  ">
        <Navbar></Navbar>
      </div>
      <div className="max-w-screen-2xl mx-auto ">
      <div className="lg:flex">
        <div className=" lg:w-64 lg:min-h-screen bg-green-700">
          <ul className="lg:menu  lg:flex-none lg:gap-6 flex lg:justify-normal justify-center flex-wrap lg:flex-nowrap gap-5 p-4">
            {checking?.role === 'superAdmin' ? (
              <>
              
              <li className="">
                <CustomNavLink to="/dashboard/users">
               Users
                </CustomNavLink>
              </li>
              <li className="">
                <CustomNavLink to="/dashboard/superAdmins">
               Super Admin
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/dashboard/clinics">
               Clinic
                </CustomNavLink> </li> <li>
                <CustomNavLink to="/dashboard/admin">
               Admin
                </CustomNavLink>
              </li>
           
              <li>
                <CustomNavLink to="/dashboard/medicine">
              Medicine
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/dashboard/dashboardAmbulance">
              Ambulance
                </CustomNavLink>
              </li>
             
              <li>
                <CustomNavLink to="/dashboard/requestedAmbulance">
                Requested For Ambulance
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/dashboard/adminHome">
                Home
                </CustomNavLink>
              </li>
              
              </>
            ) : checking?.role === 'admin' && (
              <>
                   <li>
                <CustomNavLink to="/dashboard/dashboardDoctor">
              Doctor
                </CustomNavLink>
              </li><li>
                <CustomNavLink to="/dashboard/clinicInfo">
               Clinic
                </CustomNavLink> </li>
                <li>
                <CustomNavLink to="/dashboard/department">
               Department
                </CustomNavLink> </li>
                <li>
                <CustomNavLink to="/dashboard/bloodBank">
               Blood Bank
                </CustomNavLink> </li>
              </>
            ) 
            
          
          }
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
