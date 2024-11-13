
import NoData from "@/customComponents/iconComponents/NoData";

import useAmbulance from "@/Hooks/useAmbulance";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import UpdateAmbulance from "./UpdateAmbulance";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const AmbulanceList = () => {
  const [ambulances, loading, refetch] = useAmbulance();
  
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
const [err, setErr] = useState("")

const [selectedAmbulance, setSelectedAmbulance] = useState(null); // State for the selected medicine
const [isModalOpen, setIsModalOpen] = useState(false);

const handleEditClick = (id) => {
  
  
  axiosPublic.get(`/ambulances/${id}`)
  .then(res=>{
    if(res.data.data){
      setIsModalOpen(true)
      setSelectedAmbulance(res.data.data)
      
      
    }
  }).catch(err=>setErr(err))
      
      
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false); // Close the modal
      setSelectedAmbulance(null); // Clear the selected medicine
    };
  
    const handleDelete = (id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            axiosSecure.delete(`/ambulances/${id}`)
              .then((res) => {
                if (res.data.data) {
                  refetch()
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                }
              });
          } catch (err) {
            console.log(err);
          }
        }
      });
      
    }
  


  return (
    <div className="p-6">
      <div className=" border-2 border-stone-400 ">
        
        <div className="divider "></div>
        <div className="p-3">
          {
            err ? <p className="text-red-600">{err}</p> : <div className="overflow-x-hidden">
            {ambulances.length > 0 ? (
             <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
                {/* head */}
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Ambulance Name</th>
                    
                   <th>Action</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {ambulances?.map((ambulance) => (
                    <tr key={ambulance._id}>
                      <th><img  className="w-20 h-20 rounded-full p-2" src={ambulance.image1} alt="admin image" /></th>
                      <td>{ambulance?.title}</td>
                      
                      <td>
                        <span onClick={() => handleEditClick(ambulance?._id)}>
                          <CiEdit size={20} />
                        </span>
                        <MdDelete onClick={()=>handleDelete(ambulance?._id)} size={20} />
                      </td>
                    </tr>
                    
                  ))}
                </tbody>
              </table> </div>
            ) : (
              <NoData />
            )}
          </div>
          }
        </div>
      </div>


       {/* Modal for Update Medicine */}
       {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle ">
          <UpdateAmbulance refetch={refetch}
            ambulance={selectedAmbulance}
            onClose={handleCloseModal} // Pass the close function to the modal
          />
        </dialog>
      )}
    </div>
  );
};


export default AmbulanceList;