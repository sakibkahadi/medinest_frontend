import CustomButton from "@/components/smallComponents/CustomButton";
import image from "../../assets/404/Frame.png";
import { NavLink } from "react-router-dom";
import CustomTitle from "@/components/smallComponents/CustomTitle";
import CustomDescription from "@/components/smallComponents/CustomDescription";

const Error = () => {
  return (
    <div className="w-full text-center h-screen flex items-center justify-center border-red-50 border-2 ">
      <div className="space-y-1">
        <CustomTitle heading="Sorry"></CustomTitle>
        <CustomDescription subHeading="This page is not found" />
        <img className="w-80 h-50 md:w-96 " src={image} alt="" />
        <div className="border-2 border-blue-100">
          <NavLink to="/">
            <CustomButton btnName="Back to home"></CustomButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Error;
