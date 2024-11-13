import useUser from "@/Hooks/useUser";

import { TfiMenuAlt } from "react-icons/tfi";
import User from "./User";

import { useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "@/Hooks/useAuth";



const UserList = () => {
    const [users, loading, refetch] = useUser()
    const axiosSecure = useAxiosSecure()
    const [isLoading, setIsLoading] = useState(false)
   const {userData} = useAuth()
    const handleAction = (id)=>{
      Swal.fire({
        title: "Are you sure ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: ` Yes Block ${userData?.name}`
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch('/users', {id})
          .then(res=>{ 
            if(res.data.success){Swal.fire({
              title: "Blocked",
              text: `You blocked ${userData?.name}`,
              icon: "success"
            });

           setIsLoading(true)
            refetch()
             setIsLoading(false)
        
          }})
          .catch(err=>console.log(err.response.data.message))
          
          
        }
      });
     
    }
  
    
    return (
        <div className="w-full  border-2 rounded-sm h-full border-stone-400 ">
        <div >
          <div className=" flex items-center bg-[#099635] text-black  gap-6  h-[70px] pl-6 py-1 ">
    
          <div className="flex items-center gap-2 text-white py-2 px-3 text-sm md:text-lgfont-semibold border-b-2 border-white  ">
          <span><TfiMenuAlt></TfiMenuAlt></span> User List 
            </div>
            
        
           
          </div>
          {
            isLoading ? <p>....</p> : <User users={users} handleAction={handleAction} loading={loading} />  
          }
          
        </div>
        
        </div>
    );
};

export default UserList;