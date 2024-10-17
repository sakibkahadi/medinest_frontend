import NoData from "@/customComponents/iconComponents/NoData";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useClinic from "@/Hooks/useClinic";
import { MdDelete } from "react-icons/md";

const ClinicList = () => {
  const [clinics, loading, refetch] = useClinic();
  const axiosSecure = useAxiosSecure()
  const handleDelete = (id)=>{
    try{
      axiosSecure.delete(`/clinics/${id}`)
      .then(res=>{
        if(res.data.data){
          refetch()
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }catch(err){
      console.log(err)
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
          <div className="overflow-x-hidden">
            {clinics.length > 0 ? (
              <table className=" table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Clinic Id</th>
                    <th>Clinic name</th>
                    <th>email</th>
                    <th>Phone number</th>
                    <th>address</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {clinics?.map((clinic) => (
                    <tr key={clinic._id}>
                      <th>{clinic.clinicId}</th>
                      <td>{clinic.clinicName}</td>
                      <td>{clinic.contact.email}</td>
                      <td>{clinic.contact.phoneNumber}</td>
                      <td>
                        {`${clinic.location?.postalCode}  ${clinic?.location?.street}   ${clinic.location?.city}, ${clinic.location?.country} `}
                      </td>
                      <td className="text-red-600 "><MdDelete onClick={()=>handleDelete(clinic?._id)} size={20}/></td>
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
    </div>
  );
};

export default ClinicList;
