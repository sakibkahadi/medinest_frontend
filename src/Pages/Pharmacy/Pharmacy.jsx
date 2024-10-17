import CustomTitle from "@/components/smallComponents/CustomTitle";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import MedicineCard from "./MedicineCard";
import useMedicine from "@/Hooks/useMedicine";
import NoData from "@/customComponents/iconComponents/NoData";

const Pharmacy = () => {
  const [searchData, setSearchData] = useState('');
  const [medicines, loading] = useMedicine(searchData); // Pass searchData to useMedicine

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Search request for:", searchData); // Optional: Log the search request
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(timer);
    };
  }, [searchData]);

  const handleSearch = (e) => {
    setSearchData(e.target.value); // Update search input state
  };

  return (
    <div>
      <div className="flex justify-between items-center px-10 mt-10">
        <CustomTitle heading="Medicines" />
        <div className="relative">
          <input
            type="search"
            name="search"
            value={searchData} // Bind the input value to searchData
            onChange={handleSearch} // Update state on change
            placeholder="Search..."
            className="border border-gray-300 rounded-lg h-14 px-5 pr-10 focus:outline-none w-52"
          />
          <button type="button" className="absolute text-blue-600 right-2 top-4">
            <Search />
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading ? (
          <div className="p-2 text-gray-500">Loading...</div> // Loading state
        ) : medicines.length > 0 ? (
          medicines.map((medicine) => (
            <MedicineCard key={medicine._id} medicine={medicine} />
          ))
        ) : (
          <NoData /> // Display NoData component if no medicines found
        )}
      </div>
    </div>
  );
};

export default Pharmacy;
