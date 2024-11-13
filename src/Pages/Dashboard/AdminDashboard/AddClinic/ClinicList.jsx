import NoData from "@/customComponents/iconComponents/NoData";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useClinic from "@/Hooks/useClinic";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const ClinicList = () => {
  const [clinics, loading, refetch] = useClinic();
  const axiosSecure = useAxiosSecure()
  const handleDelete = (id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete This Clinic!"
    }).then((result) => {
      if (result.isConfirmed) {
        try{
          axiosSecure.delete(`/clinics/${id}`)
          .then(res=>{
            if(res.data.data){
              Swal.fire({
                title: "Deleted!",
                text: "Clinic has been deleted.",
                icon: "success"
              });
              refetch()
            }
          })
          .catch(err=>{
            Swal.fire({
              position: "center",
              icon: "error",
              title: `${err.response.data.errorSource[0].message}`,
              showConfirmButton: false,
              timer: 1500
            });
          })
        }catch(err){
          console.log(err)
        }
      }
    });
   
  }
  return (
    <div className="p-6">
      <div className=" border-2 border-stone-400 ">
        
        <div className="divider "></div>
        <div className="p-3">
          <div className="overflow-x-hidden">
            {clinics.length > 0 ? (
             <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
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
              </table> </div>
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
