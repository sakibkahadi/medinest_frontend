import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/ErrorPage/Error";
import Ambulances from "../Pages/Ambulances/Ambulances";
import Login from '../Pages/LoginAndRegister/Login/Login'
import Register from '../Pages/LoginAndRegister/RegisterAsPatients/Register'
import ForgotPassword from "@/Pages/LoginAndRegister/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/Layout/Dashboard";
import AdminHome from "@/Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";

import AddDoctor from "@/Pages/Dashboard/AdminDashboard/AddDoctor/AddDoctor";

import AddClinic from "@/Pages/Dashboard/AdminDashboard/AddClinic/AddClinic";
import Appointment from "@/Pages/Home/Appointment/Appointment";
import Doctor from "@/Pages/Dashboard/AdminDashboard/AddDoctor/Doctor";
import DoctorList from "@/Pages/Dashboard/AdminDashboard/AddDoctor/DoctorList";
import Clinic from "@/Pages/Dashboard/AdminDashboard/AddClinic/Clinic";
import ClinicList from "@/Pages/Dashboard/AdminDashboard/AddClinic/ClinicList";
import Admin from "@/Pages/Dashboard/AdminDashboard/AddAdmin/Admin";
import AdminList from "@/Pages/Dashboard/AdminDashboard/AddAdmin/AdminList";
import AddAdmin from "@/Pages/Dashboard/AdminDashboard/AddAdmin/AddAdmin";
import Medicine from "@/Pages/Dashboard/AdminDashboard/AddMedicine/Medicine";
import MedicineList from "@/Pages/Dashboard/AdminDashboard/AddMedicine/MedicineList";
import AddMedicine from "@/Pages/Dashboard/AdminDashboard/AddMedicine/AddMedicine";
import AddCompany from "@/Pages/Dashboard/AdminDashboard/AddMedicine/AddCompany";
import AddGenericName from "@/Pages/Dashboard/AdminDashboard/AddMedicine/AddGenericName";
import UpdateMedicine from "@/Pages/Dashboard/AdminDashboard/AddMedicine/UpdateMedicine";

import UserList from "@/Pages/Dashboard/AdminDashboard/AllUsers/UserList";
import ClinicInfo from "@/Pages/Dashboard/AdminDashboard/AddClinic/ClinicInfo";
import Department from "@/Pages/Dashboard/AdminDashboard/Department/Department";
import DepartmentList from "@/Pages/Dashboard/AdminDashboard/Department/DepartmentList";
import AddDepartment from "@/Pages/Dashboard/AdminDashboard/Department/AddDepartment";
import Pharmacy from "@/Pages/Pharmacy/Pharmacy";
import MedicineDetails from "@/Pages/Pharmacy/MedicineDetails";
import AllClinics from "@/Pages/Clinics/AllClinics";
import AllDoctors from "@/Pages/Doctors/AllDoctors";
import SuperAdminDashboard from "@/Pages/Dashboard/SuperAdminDashboard/SuperAdminDashboard";
import Ambulance from "@/Pages/Dashboard/AdminDashboard/Ambulance/Ambulance";
import AmbulanceList from "@/Pages/Dashboard/AdminDashboard/Ambulance/AmbulanceList";
import AddAmbulance from "@/Pages/Dashboard/AdminDashboard/Ambulance/AddAmbulance";
import RequestedAmbulanceList from "@/Pages/Dashboard/AdminDashboard/RequestedAmbulance/RequestedAmbulanceList";
import SuperAdmin from "@/Pages/Dashboard/AdminDashboard/SuperAdmin/SuperAdmin";
import SuperAdminList from "@/Pages/Dashboard/AdminDashboard/SuperAdmin/SuperAdminList";
import AddSuperAdmin from "@/Pages/Dashboard/AdminDashboard/SuperAdmin/AddSuperAdmin";
import BloodBank from "@/Pages/Dashboard/AdminDashboard/BloodBank/BloodBank";
import BloodList from "@/Pages/Dashboard/AdminDashboard/BloodBank/BloodList";
import AddBlood from "@/Pages/Dashboard/AdminDashboard/BloodBank/AddBlood";
export const router = createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        errorElement:<Error/>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'clinics',
                element:<AllClinics/>
            },
            {
                path:'doctors',
                element:<AllDoctors/>
            },
            {
                path: "ambulances",
                element:
                <PrivateRoute><Ambulances></Ambulances></PrivateRoute>,
                
            },{
                path:"appointment",
                element:<Appointment/>
            },{
                path:"pharmacy",
                element:<Pharmacy/>,
                
            },{
                path:'/pharmacy/medicines/:id',
                element:<MedicineDetails/>,
                loader: ({params})=> fetch(`http://localhost:5000/api/medicines/${params.id}`)
            }
            
        ]
    },
    
    {
        path:"/login",
        element:<Login></Login>
    },
    {
        path:"/register",
        element:<Register></Register>
    },
    {
        path:"/forgotPassword",
        element:<ForgotPassword/>
    }
    ,{
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'adminHome',
                element:<SuperAdminDashboard/>
            },
            {
                path:'users',
                element:<UserList/>,
                
            },{
                path:'requestedAmbulance',
                element:<RequestedAmbulanceList/>
            },
            {
                path:'dashboardDoctor',
                element:<Doctor/>,
                children:[
                    {
                        path:"",
                        element:<DoctorList/>
                    },
                    {
                        path:"doctorList",
                        element:<DoctorList/>,
                        
                        
                    },
                    {
                        path:"addDoctor",
                        element:<AddDoctor/>
                    },
                ]
            },{
                path:'dashboardAmbulance',
                element:<Ambulance/>,
                children:[
                    {
                        path:"",
                        element:<AmbulanceList/>
                    },
                    {
                        path:"ambulanceList",
                        element:<AmbulanceList/>,
                        
                        
                    },
                    {
                        path:"addAmbulance",
                        element:<AddAmbulance/>
                    },
                ]
            }
            ,{
                path:'clinics',
                element:<Clinic/>,
                children:[
                    {
                        path:"",
                        element:<ClinicList/>
                    },
                    {
                        path:"clinicList",
                        element:<ClinicList/>
                    },
                    {
                        path:"addClinic",
                        element:<AddClinic/>
                    },
                ]
            },
            {
                path:'department',
                element:<Department/>,
                children:[
                    {
                        path:"",
                        element:<DepartmentList/>
                    },
                    {
                        path:"departmentList",
                        element:<DepartmentList/>
                    },
                    {
                        path:"addDepartment",
                        element:<AddDepartment/>
                    },
                ]
            }
            ,
            {
                path:'clinicInfo',
                element:<ClinicInfo/>
            }
            ,{
                path:'admin',
                element:<Admin/>,
                children:[
                    {
                        path:"",
                        element:<AdminList/>
                    },
                    {
                        path:"adminList",
                        element:<AdminList/>,
                       
                    },
                    {
                        path:"addAdmin",
                        element:<AddAdmin/>
                    },
                ]
            }
            ,{
                path:'superAdmins',
                element:<SuperAdmin/>,
                children:[
                    {
                        path:"",
                        element:<SuperAdminList/>
                    },
                    {
                        path:"superAdminList",
                        element:<SuperAdminList/>,
                       
                    },
                    {
                        path:"addSuperAdmin",
                        element:<AddSuperAdmin/>
                    },
                ]
            },
            {
                path:'bloodBank',
                element:<BloodBank/>,
                children:[
                    {
                        path:"",
                        element:<BloodList/>
                    },
                    {
                        path:"bloodList",
                        element:<BloodList/>,
                       
                    },
                    {
                        path:"addBlood",
                        element:<AddBlood/>
                    },
                ]
            },
            {
                path:'medicine',
                element:<Medicine/>,
                children:[
                    {
                        path:"",
                        element:<MedicineList/>
                    },
                    {
                        path:"medicineList",
                        element:<MedicineList/>,
                       
                    },
                    {
                        path:"addMedicine",
                        element:<AddMedicine/>
                    },
                    {
                        path:"addCompany",
                        element:<AddCompany/>
                    },
                    {
                        path:"addGenericName",
                        element:<AddGenericName/>
                    },{
                        path:"details/:medicineId",
                        element:<UpdateMedicine/>
                    }
                ]
            },
            
        ]

    },
]
)