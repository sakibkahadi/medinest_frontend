import NoData from '@/customComponents/iconComponents/NoData';

import useAxiosSecure from '@/Hooks/useAxiosSecure';

import  { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from "react-icons/im";
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const RequestedAmbulance = ({ ambulanceRequest, refetch, loading, handleAction }) => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
const [error, setError] = useState("")
  const handleReject = async (id) => {
    console.log(id);
    axiosSecure.patch(`/requestedAmbulances/${id}`, {
      status: 'canceled'
    })
    .then(res => {
      if (res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Rejected",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('updated');
        setError("")
        refetch();
      }
    }).catch(err => setError(err.response.data.errorSources[0].message));
  };

  const handleAccept = async (id) => {
    console.log(id);
    axiosSecure.patch(`/requestedAmbulances/${id}`, {
      status: 'confirmed'
    })
    .then(res => {
      if (res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You accepted",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('updated');
        setError("")
        refetch();
      }
    }).catch(err => setError(err.response.data.errorSources[0].message));
  };

  const handleDelete = async(id)=>{
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
        axiosSecure.delete(`/requestedAmbulances/${id}`)
        .then(res => {
          if (res.data.success) {
            console.log('deleeted');
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            setError("")
            refetch();
          }
        }).catch(err => {setError(err.response.data.errorSources[0].message)
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${error}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
    
  }

  // Filtered ambulance requests based on search term
  const filteredRequests = ambulanceRequest?.filter(request =>
    request?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="p-6">
      <div className="border-2 border-stone-400">
        <div className="p-3">
          <label className="mr-4" htmlFor="search">
            Search:
          </label>
          <input
            type="text"
            id="search"
            placeholder="Type here"
            className="p-1 outline-blue-600 bg-slate-200 border-stone-400 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="divider"></div>
        <div className="p-3">
          <div className="overflow-x-hidden">
            {!loading ? (
             <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>From</th>
                    <th>Destination</th>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests?.map((request, idx) => (
                    <tr key={request._id}>
                      <td>{idx + 1}</td>
                      <td>{request?.from}</td>
                      <td>{request?.destination}</td>
                      <td>{request?.name}</td>
                      <td>{request.date}</td>
                      <td>{request.timeSlot}</td>
                      <td>{request?.status}</td>
                      {request?.status === 'pending' ? (
                        <td className='flex items-center gap-2'>
                          <ImCross color='#9CA3AF' onClick={() => handleReject(request?._id)} />
                          <FaCheck color='#4CAF50' onClick={() => handleAccept(request?._id)} />
                        </td>
                      ) : (
                        <td className='flex text-red-400 items-center justify-center'>
                          <MdDelete onClick={() => handleDelete(request?._id)} />
                        </td>
                      )}
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

export default RequestedAmbulance;
