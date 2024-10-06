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
import AllUser from "@/Pages/Dashboard/AdminDashboard/AllUsers/AllUser";
import AddDoctor from "@/Pages/Dashboard/AdminDashboard/AddDoctor/AddDoctor";
import ManageDoctors from "@/Pages/Dashboard/AdminDashboard/ManageDoctors/ManageDoctors";
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
                path: "ambulances",
                element:
                <PrivateRoute><Ambulances></Ambulances></PrivateRoute>,
                
            },{
                path:"appointment",
                element:<Appointment/>
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
    },{
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'adminHome',
                element:<AdminHome></AdminHome>
            },
            {
                path:'allUsers',
                element:<AllUser></AllUser>
            },{
                path:'dashboardDoctor',
                element:<Doctor/>,
                children:[
                    {
                        path:"",
                        element:<DoctorList/>
                    },
                    {
                        path:"doctorList",
                        element:<DoctorList/>
                    },
                    {
                        path:"addDoctor",
                        element:<AddDoctor/>
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
                ]
            },
            
        ]

    },
]
)