
import NoData from "@/customComponents/iconComponents/NoData";



import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";


import UpdateBloodBank from "./UpdateBloodBank";
import useBlood from "@/Hooks/useBlood";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const BloodList = () => {
  const [bloods, loading, refetch] = useBlood()
  const axiosSecure = useAxiosSecure()
  const [err,setErr] = useState("")
  const [clinicId, setClinics] = useState([]);
  useEffect(() => {
   axiosSecure
     .get(`/clinics/${localStorage.getItem("userId")}/admins`)
     .then((res) => setClinics(res.data.data._id))
     .catch((err) => setErr(err.response.data));
 }, [axiosSecure]);

 const bloodsByClinic = clinicId && bloods ? bloods.filter(blood => blood?.clinicName?._id === clinicId) : [];


const [isModalOpen, setIsModalOpen] = useState(false)
const [selectedBlood, setSelectedBlood] = useState(null);

const handleEditClick = (blood) => {
    setSelectedBlood(blood); // Set the selected Department
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedBlood(null); // Clear the selected Department
  };




  return (
    <div className="p-6">
      <div className=" border-2 border-stone-400 ">
        
        <div className="p-3">
          {
           loading? <p className="text-red-600">loading...</p> : <div className="overflow-x-hidden">
            {bloodsByClinic.length > 0 ? (
              <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
                {/* head */}
                <thead>
                  <tr>
                    <th>Blood Group</th>
                    <th>Quantity</th>
                   <th>Price</th>
                   <th>Action</th>
                   
                  </tr>
                </thead>
               {
                !err ?  <tbody>
                {bloodsByClinic?.map((blood) => (
                  <tr key={blood._id}>
                    
                    <td>{blood?.bloodGroup}</td>
                    <td>{blood?.quantity}</td>
                    <td>{blood?.price}</td>
                    <td>
                      <span onClick={() => handleEditClick(blood)}>
                        <CiEdit size={20} />
                      </span>
                     
                    </td>
                  </tr>
                  
                ))}
              </tbody>: <div className="via-red-600">{err}</div>
               }
              </table> </div>
            ) : (
              <NoData />
            )}
          </div>
          }
        </div>
      </div>
      {/* Modal for Update blood */}
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle ">
          <UpdateBloodBank refetch={refetch}
            blood={selectedBlood} loading={loading}
            onClose={handleCloseModal} // Pass the close function to the modal
          />
        </dialog>
      )}
    </div>
  );
};






export default BloodList;