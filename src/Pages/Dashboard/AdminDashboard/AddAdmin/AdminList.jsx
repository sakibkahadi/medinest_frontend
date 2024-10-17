
import NoData from "@/customComponents/iconComponents/NoData";
import useAdmin from "@/Hooks/useAdmin";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

import { useState } from "react";
import { MdDelete } from "react-icons/md";

const AdminList = () => {
  const [admins, loading, refetch] = useAdmin();
  const axiosSecure = useAxiosSecure()
const [err, setErr] = useState("")
  const handleDelete = (id)=>{
  
    try {
      axiosSecure.delete(`/admins/${id}`)
        .then((res) => {
          if (res.data.data) {
            console.log(loading)
            refetch()
            console.log(loading)
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
            {admins.length > 0 ? (
              <table className=" table">
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
              </table>
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