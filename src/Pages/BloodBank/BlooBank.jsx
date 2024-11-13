import CustomTitle from "@/components/smallComponents/CustomTitle";
import useBlood from "@/Hooks/useBlood";
import { useEffect, useState } from "react";
import BloodBankCard from "./BloodBankCard";
import NoData from "@/customComponents/iconComponents/NoData";
import { Search } from "lucide-react";


const BlooBank = () => {
    const [search, setSearch] = useState("");
    const [bloods, loading] = useBlood(search); 
    
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
                <CustomTitle heading="Blood Bank" />
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
                {bloods.length > 0 ? (
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 ">
                        {bloods.map((blood) => (
                            <BloodBankCard key={blood._id} blood={blood} />
                        ))}
                    </div>
                ) : (
                    <NoData />
                )}
            </div>
        </div>
    );
};



export default BlooBank;