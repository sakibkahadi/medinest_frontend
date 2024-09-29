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
                
            },
            
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
                path:'addDoctor',
                element:<AddDoctor/>
            },
            {
                path:'manageDoctors',
                element:<ManageDoctors/>
            },{
                path:'addClinic',
                element:<AddClinic/>
            }
        ]

    },
]
)