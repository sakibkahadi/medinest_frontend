import useAdmin from "@/Hooks/useAdmin";
import useAmbulance from "@/Hooks/useAmbulance";
import useClinic from "@/Hooks/useClinic";
import useDoctor from "@/Hooks/useDoctor";
import usePatient from "@/Hooks/usePatients";
import { FaAmbulance, FaBed, FaHospital } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
const SuperAdminDashboard = () => {
    const [clinics] =useClinic()
    const [patients] = usePatient()
    const [doctors] = useDoctor()
    const [admins] = useAdmin()
const [ambulances] = useAmbulance()
    return (
        <div>
            {/* 1st row */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 ">
                {/* Clinis */}
                <div className=" rounded-lg  bg-slate-100 p-5 flex     items-center gap-5">
                    {/* icon */}
                    <div className="text-blue-600">
                    <FaHospital size={30} />
                    </div>
                    {/* content */}
                    <div className="flex flex-col ">
                        <p className="font-bold">{clinics.length}</p>
                        <p className="font-semibold text-slate-400">Clinic</p>
                    </div>
                </div>
                {/* patient */}
                <div className=" rounded-lg  bg-slate-100 p-5 flex items-center gap-5">
                    {/* icon */}
                    <div className="text-blue-600">
                    <FaBed size={30} />
                    </div>
                    {/* content */}
                    <div className="flex flex-col ">
                        <p className="font-bold">{patients.length}</p>
                        <p className="font-semibold text-slate-400">Patient</p>
                    </div>
                </div>
                {/* doctor */}
                <div className=" rounded-lg  bg-slate-100 p-5 flex items-center gap-5">
                    {/* icon */}
                    <div className="text-blue-600">
                    <FaUserDoctor size={30} />
                    </div>
                    {/* content */}
                    <div className="flex flex-col ">
                        <p className="font-bold">{doctors.length}</p>
                        <p className="font-semibold text-slate-400">Doctor</p>
                    </div>
                </div>
                {/*admin */}
                <div className=" rounded-lg  bg-slate-100 p-5 flex items-center gap-5">
                    {/* icon */}
                    <div className="text-blue-600">
                    <RiAdminLine size={30} />
                    </div>
                    {/* content */}
                    <div className="flex flex-col ">
                        <p className="font-bold">{admins.length}</p>
                        <p className="font-semibold text-slate-400">Admin</p>
                    </div>
                </div>
                {/*ambulance */}
                <div className=" rounded-lg  bg-slate-100 p-5 flex items-center gap-5">
                    {/* icon */}
                    <div className="text-blue-600">
                    <FaAmbulance size={30} />
                    </div>
                    {/* content */}
                    <div className="flex flex-col ">
                        <p className="font-bold">{ambulances.length}</p>
                        <p className="font-semibold text-slate-400">Ambulance</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;