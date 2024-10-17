import useUser from "@/Hooks/useUser";

import { TfiMenuAlt } from "react-icons/tfi";
import User from "./User";

import { useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";



const UserList = () => {
    const [users, loading, refetch] = useUser()
    const axiosSecure = useAxiosSecure()
    const [isLoading, setIsLoading] = useState(false)
   
    const handleAction = (id)=>{

      axiosSecure.patch('/users', {id})
      .then(res=>{ 
        if(res.data.success){
       setIsLoading(true)
        refetch()
         setIsLoading(false)
    
      }})
      .catch(err=>console.log(err.response.data.message))
      
    }
  
    
    return (
        <div className="w-full  border-2 rounded-sm h-full border-stone-400 ">
        <div >
          <div className=" flex items-center bg-[#099635] text-black  gap-6  h-[70px] pl-6 py-1 ">
    
          <div className="flex items-center gap-2 text-white py-2 px-3 text-lg font-semibold border-b-2 border-white  ">
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