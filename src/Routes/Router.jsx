import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/ErrorPage/Error";
import Ambulances from "../Pages/Ambulances/Ambulances";
import Login from "../Pages/LoginAndRegister/Login/Login";
import Register from "../Pages/LoginAndRegister/RegisterAsPatients/Register";
import ForgotPassword from "@/Pages/LoginAndRegister/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/Layout/Dashboard";
import AdminHome from "@/Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";

import AddDoctor from "@/Pages/Dashboard/AdminDashboard/AddDoctor/AddDoctor";

import AddClinic from "@/Pages/Dashboard/AdminDashboard/AddClinic/AddClinic";

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
import Appointment from "@/Pages/Doctors/Appointment";
import BlooBank from "@/Pages/BloodBank/BlooBank";
import MyAppointment from "@/Pages/Dashboard/AdminDashboard/MyAppointments/MyAppointment";
import AppointmentList from "@/Pages/Dashboard/AdminDashboard/MyAppointments/AppointmentList";
import Cart from "@/Pages/Dashboard/AdminDashboard/MyCart/Cart";
import CartList from "@/Pages/Dashboard/AdminDashboard/MyCart/CartList";
import PaymentHistory from "@/Pages/Dashboard/PaymentHistory/PaymentHistory";
import PaymentList from "@/Pages/Dashboard/PaymentHistory/PaymentList";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "clinics",
        element: <AllClinics />,
      },
      {
        path: "bloodBanks",
        element: <PrivateRoute><BlooBank /></PrivateRoute>,
      },
      {
        path: "doctors",
        element: <PrivateRoute><AllDoctors /></PrivateRoute>,
      },
      {
        path: "ambulances",
        element: (
          
            <PrivateRoute><Ambulances></Ambulances></PrivateRoute>
          
        ),
      },
      {
        path: "appointment",
        element: <PrivateRoute><Appointment /></PrivateRoute>,
      },
      {
        path: "pharmacy",
        element: <Pharmacy />,
      },
      {
        path: "/pharmacy/medicines/:id",
        element: <MedicineDetails />,
        loader: ({ params }) =>
          fetch(
            `https://healthcare-backend-node.vercel.app/api/medicines/${params.id}`
          ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute ><Dashboard></Dashboard> </PrivateRoute> ,
    children: [
      {
        path: "adminHome",
        element: <PrivateRoute> <SuperAdminDashboard /></PrivateRoute>,
      },
      {
        path: "users",
        element: <PrivateRoute><UserList /></PrivateRoute>,
      },
      {
        path: "requestedAmbulance",
        element: <PrivateRoute><RequestedAmbulanceList /></PrivateRoute>,
      },
      {
        path: "dashboardDoctor",
        element: <PrivateRoute><Doctor /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><DoctorList /></PrivateRoute>,
          },
          {
            path: "doctorList",
            element: <PrivateRoute><DoctorList /></PrivateRoute>,
          },
          {
            path: "addDoctor",
            element: <PrivateRoute><AddDoctor /></PrivateRoute>,
          },
        ],
      },
      {
        path: "myPaymentHistory",
        element: <PrivateRoute><PaymentHistory /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><PaymentList /></PrivateRoute>,
          },
          {
            path: "paymentList",
            element: <PrivateRoute><PaymentList /></PrivateRoute>,
          },
        ],
      },
      {
        path: "myAppointment",
        element: <PrivateRoute><MyAppointment /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><AppointmentList /></PrivateRoute>,
          },
          {
            path: "appointmentList",
            element:  <PrivateRoute><AppointmentList /></PrivateRoute>,
          },
        ],
      },
      {
        path: "myCart",
        element: <PrivateRoute><Cart /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><CartList /></PrivateRoute>,
          },
          {
            path: "cartList",
            element: <PrivateRoute><CartList /></PrivateRoute>,
          },
        ],
      },
      {
        path: "dashboardAmbulance",
        element:<PrivateRoute> <Ambulance /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><AmbulanceList /></PrivateRoute>,
          },
          {
            path: "ambulanceList",
            element: <PrivateRoute><AmbulanceList /></PrivateRoute>,
          },
          {
            path: "addAmbulance",
            element: <PrivateRoute><AddAmbulance /></PrivateRoute>,
          },
        ],
      },
      {
        path: "clinics",
        element: <PrivateRoute><Clinic /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><ClinicList /></PrivateRoute>,
          },
          {
            path: "clinicList",
            element: <PrivateRoute><ClinicList /></PrivateRoute>,
          },
          {
            path: "addClinic",
            element: <PrivateRoute><AddClinic /></PrivateRoute>,
          },
        ],
      },
      {
        path: "department",
        element: <PrivateRoute><Department /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><DepartmentList /></PrivateRoute>,
          },
          {
            path: "departmentList",
            element: <PrivateRoute><DepartmentList /></PrivateRoute>,
          },
          {
            path: "addDepartment",
            element: <PrivateRoute><AddDepartment /></PrivateRoute>,
          },
        ],
      },
      {
        path: "clinicInfo",
        element: <PrivateRoute><ClinicInfo /></PrivateRoute>,
      },
      {
        path: "admin",
        element: <PrivateRoute><Admin /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><AdminList /></PrivateRoute>,
          },
          {
            path: "adminList",
            element: <PrivateRoute><AdminList /></PrivateRoute>,
          },
          {
            path: "addAdmin",
            element: <PrivateRoute><AddAdmin /></PrivateRoute>,
          },
        ],
      },
      {
        path: "superAdmins",
        element: <PrivateRoute><SuperAdmin /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><SuperAdminList /></PrivateRoute>,
          },
          {
            path: "superAdminList",
            element: <PrivateRoute><SuperAdminList /></PrivateRoute>,
          },
          {
            path: "addSuperAdmin",
            element: <PrivateRoute><AddSuperAdmin /></PrivateRoute>,
          },
        ],
      },
      {
        path: "bloodBank",
        element: <PrivateRoute><BloodBank /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><BloodList /></PrivateRoute>,
          },
          {
            path: "bloodList",
            element: <PrivateRoute><BloodList /></PrivateRoute>,
          },
          {
            path: "addBlood",
            element: <PrivateRoute><AddBlood /></PrivateRoute>,
          },
        ],
      },
      {
        path: "medicine",
        element: <PrivateRoute><Medicine /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <PrivateRoute><MedicineList /></PrivateRoute>,
          },
          {
            path: "medicineList",
            element: <PrivateRoute><MedicineList /></PrivateRoute>,
          },
          {
            path: "addMedicine",
            element: <PrivateRoute><AddMedicine /></PrivateRoute>,
          },
          {
            path: "addCompany",
            element: <PrivateRoute><AddCompany /></PrivateRoute>,
          },
          {
            path: "addGenericName",
            element: <PrivateRoute><AddGenericName /></PrivateRoute>,
          },
          {
            path: "details/:medicineId",
            element: <PrivateRoute><UpdateMedicine /></PrivateRoute>,
          },
        ],
      },
    ],
  },
]);
