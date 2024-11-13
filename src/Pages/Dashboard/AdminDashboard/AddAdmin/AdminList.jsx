
import NoData from "@/customComponents/iconComponents/NoData";
import useAdmin from "@/Hooks/useAdmin";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const AdminList = () => {
  const [admins, loading, refetch] = useAdmin();
  const axiosSecure = useAxiosSecure()
const [err, setErr] = useState("")
  const handleDelete = (id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete Admin!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/admins/${id}`)
            .then((res) => {
              if (res.data.data) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Admin has been deleted.",
                  icon: "success"
                });
                refetch()
                
              }
            }).catch(err=>{setErr(err.response.data.message); 

              Swal.fire({
                position: "center",
                icon: "error",
                title: `${err.response.data.message}`,
                showConfirmButton: false,
                timer: 1500
              });


             })
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
            {admins.length > 0 ? ( 
              <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
                {/* head */}
                <thead>
                  <tr>
                    <th>profile</th>
                    <th>Clinic Name</th>
                    <th>admins name</th>
                    <th>email</th>
                    <th>Phone number</th>
                   <th>Action</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {admins?.map((admins) => (
                    <tr key={admins._id}>
                      <th><img className="w-20 h-20 rounded-full p-2" src={admins.image} alt="admin image" /></th>
                      <td>{admins?.clinicName?.clinicName}</td>
                      <td>{admins?.name}</td>
                      <td>{admins?.email}</td>
                      <td>{admins?.phoneNumber}</td>
                      <td className="text-red-600"><MdDelete onClick={()=>handleDelete(admins?._id)} size={20}/></td>
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
    </div>
  );
};


export default AdminList;