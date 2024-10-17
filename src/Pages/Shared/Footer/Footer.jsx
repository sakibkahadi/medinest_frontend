import MoreInfo from "./MoreInfo";
import Organization from "./Organization";
import OurInformation from "./OurInformation";
import PatientsInfo from "./PatientsInfo";
import "daisyui/dist/full.css";
const Footer = () => {
  return (
    <footer className=" bg-[#f3f3f3] text-black  max-w-screen-xl mx-auto  p-10 h-full ">
      <div>
        <div 
        className="grid grid-cols-1 gap-10  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
        >
          <OurInformation></OurInformation>

          <MoreInfo></MoreInfo>
          <PatientsInfo></PatientsInfo>
          <Organization></Organization>
        </div>
      </div>

      <span className=" mt-6 w-full flex justify-center">
        <p className="text-sm text-slate-400 ">
          Copyright © ${new Date().getFullYear()} - All right reserved by
          MedNes.t
        </p>
      </span>
    </footer>
  );
};

export default Footer;
