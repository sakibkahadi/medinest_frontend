/* eslint-disable react/prop-types */
import { FaHospitalAlt } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import Appointment from "./Appointment";

// Helper function to convert 24-hour time to 12-hour time with AM/PM
const formatTime = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const isPM = hour >= 12;
  const formattedHour = hour % 12 || 12; // Converts 0 to 12 for 12-hour format
  const formattedMinute = minute < 10 ? `0${minute}` : minute; // Ensures double-digit minutes
  return `${formattedHour}:${formattedMinute} ${isPM ? "PM" : "AM"}`;
};

const DoctorCard = ({ doctor }) => {
  const {
    _id,
    clinicName,
    consltationFee,
    department,
    email,
    experience,
    image,
    intervals,
    startTime,
    endTime,
    name,
    phoneNumber,
  } = doctor;

  return (
    <div className="card bg-base-200 mx-auto mt-5 relative">
      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="">
            <img className="rounded-lg" src={image} alt="doctor" />
          </div>
          <div className="px-4 space-y-4 md:col-span-2">
            <h2 className="font-bold text-4xl">{name}</h2>
            <p className="text-2xl text-slate-500">
              Specializing in {department?.departmentName}
            </p>

            <p className="text-2xl">
              Years of Experience: {experience > 0 ? experience : "Coming Soon"}
            </p>
            <p className="text-xl ">Contact: {phoneNumber}</p>

            <div className="!mt-5 grid grid-cols-1 md:grid-cols-2">
              <div className="flex items-center gap-5">
                <span className="text-blue-700">
                  <FaHospitalAlt size={30} />
                </span>
                <div>
                  <h1 className="text-2xl font-bold">
                    {clinicName?.clinicName}
                  </h1>
                  <p className="text-xl">
                    {clinicName?.location?.street}, {clinicName?.location?.city}
                    - {clinicName?.location?.postalCode},{" "}
                    {clinicName?.location?.country}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-blue-700">
                  <CiClock2 size={30} />
                </span>
                <div>
                  <h1 className="text-2xl font-bold">Availability</h1>
                  <p className="text-xl">
                    {formatTime(startTime)} - {formatTime(endTime)}
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="divider !h-2"></div>
        <div className="flex justify-between gap-5 flex-col md:flex-row md:justify-end  items-center md:items-start ">
        <h1 className="   md:text-xl font-semibold text-slate-500 text-end  ">
              Book Appointment for:
            </h1>
            
            <Appointment _id={_id} intervals={intervals} name={name} />
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
