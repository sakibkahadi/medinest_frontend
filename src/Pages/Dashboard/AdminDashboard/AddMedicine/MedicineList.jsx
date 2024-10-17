import NoData from "@/customComponents/iconComponents/NoData";
import useMedicine from "@/Hooks/useMedicine";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import UpdateMedicine from "./UpdateMedicine";
import { useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const MedicineList = () => {
  const [medicines, loading, refetch] = useMedicine();
  const [selectedMedicine, setSelectedMedicine] = useState(null); // State for the selected medicine
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
const axiosSecure = useAxiosSecure()
const axiosPublic = useAxiosPublic()
  const handleEditClick = (id) => {
    
axiosPublic.get(`/medicines/${id}`)
.then(res=>{
  if(res.data.success){
    setIsModalOpen(true)
    setSelectedMedicine(res.data.data)
    
  }
})
    
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedMedicine(null); // Clear the selected medicine
  };

  const handleDelete = (id)=>{
    try {
      axiosSecure.delete(`/medicines/${id}`)
        .then((res) => {
          if (res.data.data) {
            refetch()
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  
  return (
    <div className="p-6">
      <div className="border-2 border-stone-400 ">
        <div className="p-3">
          <label className="mr-4" htmlFor="">
            Search:
          </label>
          <input
            type="text"
            placeholder="type here"
            className="p-1 border-2 border-stone-400 rounded-md"
          />
        </div>
        <div className="divider"></div>
        <div className="p-3">
          <div className="overflow-x-hidden">
            {medicines.length > 0 ? (
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Product Image</th>
                 
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine) => (
                    <tr key={medicine._id}>
                      <th>
                        <img
                          className="w-20 h-20 rounded-full p-2"
                          src={medicine?.productImage}
                          alt="Product"
                        />
                      </th>
                    
                      <td>
                        {medicine?.productName} {medicine?.productPower}
                      </td>
                      <td>{medicine?.productType}</td>
                      <td>
                        {medicine?.isAvailable === true ? "in-stock" : "out-of-stock"}
                      </td>
                      <td>{medicine?.stripSize * medicine?.unitPrice}</td>
                      <td>{medicine?.quantity}</td>
                      <td>
                        <span onClick={() => handleEditClick(medicine?._id)}>
                          <CiEdit size={20} />
                        </span>
                        <MdDelete onClick={()=>handleDelete(medicine?._id)} size={20} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>

      {/* Modal for Update Medicine */}
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle ">
          <UpdateMedicine refetch={refetch}
            medicine={selectedMedicine}
            onClose={handleCloseModal} // Pass the close function to the modal
          />
        </dialog>
      )}
    </div>
  );
};

export default MedicineList;
