/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import MapComponent from "./MapContainer";

const ClinicCard = ({ clinic }) => {
    const { clinicName, contact, location, clinicImage } = clinic;
    const [showMap, setShowMap] = useState(false); // State to manage map visibility

    const toggleMap = () => {
        setShowMap(prevShowMap => !prevShowMap); // Toggle the map visibility
    };

    return (
        <div className="card bg-base-200 mx-auto mt-5  relative">
            <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="w-full h-full">
                        <img className='rounded-lg' src={clinicImage} alt="Clinic" />
                    </div>
                    <div className="px-4">
                        <h2 className="font-bold text-3xl">{clinicName}</h2>
                        <p className="text-[#1e6fc0]">Specializing in Family Medicine</p>
                        <p>Address: {location?.postalCode}, {location?.street}, {location?.city}</p>
                        <p>Contact: {contact?.phoneNumber}</p>
                        <p>Email: {contact?.email}</p>
                    </div>
                </div>

                <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        <h3 className="font-semibold text-lg">Available Services:</h3>
                        <ul className="list-disc pl-5">
                            <li>General Consultations</li>
                            <li>Pediatric Care</li>
                            <li>Emergency Services</li>
                            <li>Health Check-Ups</li>
                        </ul>
                    </div>
                    <div className="border flex items-center justify-center gap-2 w-fit h-fit p-2 bg-white">
                        <button onClick={toggleMap} className="flex items-center gap-2">
                            <span>{showMap ? "Hide Map" : "Show Map"}</span>
                            <span className="text-blue-600"><FaMapMarkerAlt /></span>
                        </button>
                    </div>
                </div>

                {showMap && (
                    <div className="mt-5">
                        <MapComponent lat={location?.latitude} lng={location?.longitude} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClinicCard;
