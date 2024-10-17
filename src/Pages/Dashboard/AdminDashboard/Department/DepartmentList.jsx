
import NoData from "@/customComponents/iconComponents/NoData";
import useAdmin from "@/Hooks/useAdmin";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useDepartment from "@/Hooks/useDepartment";

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import UpdateDepartment from "./UpdateDepartment";

const DepartmentList = () => {
  const [departments, loading, refetch] = useDepartment();
  const axiosSecure = useAxiosSecure()
const [err, setErr] = useState("")
const [isModalOpen, setIsModalOpen] = useState(false)
const [selectedDepartment, setSelectedDepartment] = useState(null)


const handleEditClick = (department) => {
    setSelectedDepartment(department); // Set the selected Department
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedDepartment(null); // Clear the selected Department
  };


  const handleDelete = (id)=>{
  
    try {
      axiosSecure.delete(`/departments/${id}`)
        .then((res) => {
          if (res.data.data) {
            
            refetch()
            
          }
        }).catch(err=>{setErr(err.response.data.message);  })
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="p-6">
      <div className=" border-2 border-stone-400 ">
        <div className="p-3">
          <label className="mr-4" htmlFor="">
            {" "}
            Search:
          </label>
          <input
            type="text"
            placeholder="type here"
            className=" p-1 border-2 border-stone-400 rounded-md"
          />
        </div>
        <div className="divider "></div>
        <div className="p-3">
          {
            err ? <p className="text-red-600">{err}</p> : <div className="overflow-x-hidden">
            {departments.length > 0 ? (
              <table className=" table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Department Name</th>
                    <th>Description</th>
                   
                   <th>Action</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {departments?.map((department) => (
                    <tr key={department._id}>
                      
                      <td>{department?.departmentName}</td>
                      <td>{department?.departmentDescription}</td>
                      
                      <td>
                        <span onClick={() => handleEditClick(department)}>
                          <CiEdit size={20} />
                        </span>
                        <MdDelete onClick={()=>handleDelete(department?._id)} size={20} />
                      </td>
                    </tr>
                    
                  ))}
                </tbody>
              </table>
            ) : (
              <NoData />
            )}
          </div>
          }
        </div>
      </div>
      {/* Modal for Update Department */}
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle ">
          <UpdateDepartment refetch={refetch}
            department={selectedDepartment} loading={loading}
            onClose={handleCloseModal} // Pass the close function to the modal
          />
        </dialog>
      )}
    </div>
  );
};




export default DepartmentList;