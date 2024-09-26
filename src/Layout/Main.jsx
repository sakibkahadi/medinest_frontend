import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";






const Main = () => {
    return (
        <div className="space-y-12 ">
            <div className="bg-[#07332f] "><Navbar></Navbar></div>
        
            {/* <div className=" min-h-screen"> */}
            <div className="max-w-screen-xl mx-auto bg-white" >
            <Outlet/>
            </div>
           <Footer></Footer>
        </div>
    );
};

export default Main;