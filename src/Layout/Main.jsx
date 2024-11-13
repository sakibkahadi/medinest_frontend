import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";






const Main = () => {
    return (
        <div className=" ">
            <div className="bg-[#07332f] "><Navbar></Navbar></div>
        
            {/* <div className=" min-h-screen"> */}
            <div className="max-w-screen-xl mx-auto bg-white min-h-screen mb-10" >
            <Outlet/>
            </div>
           <div className="mt-10">
           <Footer></Footer>
           </div>
        </div>
    );
};

export default Main;