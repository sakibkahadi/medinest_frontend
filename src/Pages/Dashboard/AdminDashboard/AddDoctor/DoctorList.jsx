

import NoData from "@/customComponents/iconComponents/NoData";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useDoctor from "@/Hooks/useDoctor";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";


const DoctorList = () => {

  const axiosSecure = useAxiosSecure()
const [err, setErr] = useState("")
const [doctors, loading, refetch] = useDoctor()
  //fetch clinicData
  const [clinicId, setClinics] = useState([]);
  useEffect(() => {
   axiosSecure
     .get(`/clinics/${localStorage.getItem("userId")}/admins`)
     .then((res) => setClinics(res.data.data._id))
     .catch((err) => setErr(err.response.data));
 }, [axiosSecure]);



const doctorByClinic = doctors.filter(doctor=>doctor?.clinicName._id === clinicId)


const handleDelete = (id)=>{
  
    try {
      axiosSecure.delete(`/doctors/${id}`)
        .then((res) => {
         
          if (res.data.success) {
          
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
            {doctorByClinic.length > 0 ? (
              <table className=" table">
                {/* head */}
                <thead>
                  <tr>
                    <th>profile</th>
                    <th>Name</th>
                 
                    <th>Email</th>
                    <th>Phone number</th>
                   <th>Fee</th>
                   <th>Action</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {doctorByClinic?.map((doctor) => (
                    <tr key={doctor._id}>
                      <th><LazyLoadImage  className="w-20 h-20 rounded-full p-2" src={doctor.image} alt="doctor image" /></th>
                 
                      <td>{doctor?.name}</td>
                      <td>{doctor?.email}</td>
                      <td>{doctor?.phoneNumber}</td>
                      <td>{doctor.consultationFee} <span className="text-xl">৳</span></td>
                      <td className="text-red-600"><MdDelete onClick={()=>handleDelete(doctor?._id)} size={20}/></td>
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




export default DoctorList;