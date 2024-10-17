
import NoData from "@/customComponents/iconComponents/NoData";

import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useSuperAdmin from "@/Hooks/useSuperAdmin";

import { useState } from "react";
import { MdDelete } from "react-icons/md";

const SuperAdminList = () => {
  const [superAdmins, loading, refetch] = useSuperAdmin();
  const axiosSecure = useAxiosSecure()
  console.log(superAdmins)
const [err, setErr] = useState("")
  const handleDelete = (id)=>{
  
    try {
      axiosSecure.delete(`/superAdmins/${id}`)
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
            {superAdmins.length > 0 ? (
              <table className=" table">
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


export default SuperAdminList;