import { Link } from "react-router-dom";
import doctor from "../../../assets/services/Doctor.png";
import ambulance from "../../../assets/services/Ambulance.png";
import store from "../../../assets/services/Pharmacy.png";
import bloodBank from "../../../assets/services/Blood.png";
const OurServices = () => {
  return (
    <div className="container mx-auto">
      <div className="py-12 md:mt-20">
        <h2 className=" md:text-3xl  text-xl lg:text-5xl font-bold text-[#0D2E4E] text-center mb-8">
          Our Services
        </h2>
        <p className="font-semibold text-center text-gray-600 mb-10 ">
          At MediNest, we provide essential healthcare services tailored to your
          needs, ensuring quality and accessibility for everyone.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4  text-justify">
          <Link
            to=""
            className=" bg-gradient-to-r from-blue-300 to-blue-500  md:p-6 p-4 hover:scale-105  duration-[0.4s] rounded-lg shadow-md text-center"
          >
            <img
              src={doctor}
              alt="Healthcare Providers"
              className="md:w-32 w-20 mx-auto md:mb-4 mb-1 hover:scale-105  duration-[0.4s]"
            />
            <h3 className="md:text-2xl text-xl font-bold   md:mb-2 mb-1">
              Healthcare Providers
            </h3>
            <p className="font-semibold text-black fonts text-sm">
              Connect with trusted doctors and clinics for general and
              specialized healthcare needs.
            </p>
          </Link>

          <Link
            to=""
            className=" bg-gradient-to-r from-yellow-200 to-yellow-500  hover:scale-105  duration-[0.4s] md:p-6 p-4 rounded-lg shadow-md text-center"
          >
            <img
              src={ambulance}
              alt="Ambulance Services"
              className="md:w-32 w-20 mx-auto md:mb-4 mb-1 hover:scale-105  duration-[0.4s]"
            />
            <h3 className="md:text-2xl text-xl font-bold md:mb-2 mb-1">
              Ambulance Services
            </h3>
            <p className="font-semibold text-black fonts text-sm">
              24/7 emergency transportation to ensure safe and quick access to
              healthcare.
            </p>
          </Link>

          <Link
            to=""
            className="  bg-gradient-to-r from-green-300 to-green-600 hover:scale-105  duration-[0.4s] md:p-6 p-4 rounded-lg shadow-md text-center"
          >
            <img
              src={store}
              alt="MediEquip & Supplies"
              className="md:w-32 w-20 mx-auto md:mb-4 mb-1 hover:scale-105  duration-[0.4s]"
            />
            <h3 className="md:text-2xl text-xl font-bold md:mb-2 mb-1">
              Health Store
            </h3>
            <p className="font-semibold text-black fonts text-sm">
              Order medicines with doorstep delivery and enjoy exclusive
              membership discounts.
            </p>
          </Link>

          <Link
            to=""
            className="bg-gradient-to-r from-red-400 to-rose-700
 hover:scale-105  duration-[0.4s] md:p-6 p-4 rounded-lg shadow-md text-center"
          >
            <img
              src={bloodBank}
              alt="Blood Bank"
              className="md:w-32 w-20 mx-auto md:mb-4 mb-1 hover:scale-105  duration-[0.4s]"
            />
            <h3 className="md:text-2xl text-xl font-bold md:mb-2 mb-1">
              Blood Bank
            </h3>
            <p className="font-semibold text-black fonts text-sm">
              Quick access to blood donations and urgent requests during
              emergencies.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
