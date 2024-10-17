import useClinic from "@/Hooks/useClinic";
import NoData from "@/customComponents/iconComponents/NoData";
import ClinicCard from "./ClinicCard";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CustomTitle from "@/components/smallComponents/CustomTitle";

const AllClinics = () => {
    const [search, setSearch] = useState("");
    const [clinics, loading] = useClinic(search); // Pass search as searchTerm to the hook

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Search request for:", search); // Optional: Log the search request
        }, 500); // 500ms debounce

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    return (
        <div>
            <div className="flex justify-between items-center px-10 mt-10">
                <CustomTitle heading="Clinics" />
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
                {clinics.length > 0 ? (
                    <div>
                        {clinics.map((clinic) => (
                            <ClinicCard key={clinic._id} clinic={clinic} />
                        ))}
                    </div> 
                ) : loading? <div className="flex justify-center items-center">loading...</div> : (
                    <NoData />
                )}
            </div>
        </div>
    );
};

export default AllClinics;
