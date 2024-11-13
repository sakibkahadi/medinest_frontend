
import NoData from "@/customComponents/iconComponents/NoData";

import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useSuperAdmin from "@/Hooks/useSuperAdmin";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const SuperAdminList = () => {
  const [superAdmins, loading, refetch] = useSuperAdmin();
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
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/superAdmins/${id}`)
            .then((res) => {
              if (res.data.data) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Deleted Successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
                refetch()
               
              }
            }).catch(err=>{setErr(err.response.data.message); 
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to remove super admin",
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
            {superAdmins.length > 0 ? (
              <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
                {/* head */}
                <thead>
                  <tr>
                    <th>profile</th>
                
                    <th>superAdmins name</th>
                    <th>email</th>
                    <th>Phone number</th>
                   <th>Action</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {superAdmins?.map((superAdmins) => (
                    <tr key={superAdmins._id}>
                      <th><img className="w-20 h-20 rounded-full p-2" src={superAdmins.image} alt="admin image" /></th>
                    
                      <td>{superAdmins?.name}</td>
                      <td>{superAdmins?.email}</td>
                      <td>{superAdmins?.phoneNumber}</td>
                      <td className="text-red-600"><MdDelete onClick={()=>handleDelete(superAdmins?._id)} size={20}/></td>
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


export default SuperAdminList;