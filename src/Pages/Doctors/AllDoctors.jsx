import CustomTitle from "@/components/smallComponents/CustomTitle";
import NoData from "@/customComponents/iconComponents/NoData";
import useDoctor from "@/Hooks/useDoctor";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";

const AllDoctors = () => {
    const [search, setSearch] = useState("");
    const [doctors, loading] = useDoctor(search); // Pass search as searchTerm to the hook
console.log(doctors)
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Search request for:", search); 
        }, 500); 
        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    return (
        <div>
            <div className="flex justify-between items-center px-10 mt-10">
                <CustomTitle heading="Doctors" />
                <div className="relative">
                    <input
                        type="search"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="border border-gray-300 rounded-lg h-14 px-5 pr-10 focus:outline-none w-52"
                    />
                    <button type="button" className="absolute text-blue-600 right-2 top-4">
                        <Search />
                    </button>
                </div>
            </div>
            <div>
                {doctors.length > 0 ? (
                    <div>
                        {doctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                    </div>
                ) : (
                    <NoData />
                )}
            </div>
        </div>
    );
};

export default AllDoctors;