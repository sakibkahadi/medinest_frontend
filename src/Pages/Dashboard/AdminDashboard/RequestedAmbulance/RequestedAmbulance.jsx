import NoData from '@/customComponents/iconComponents/NoData';
import React from 'react';

const RequestedAmbulance = ({ambulanceRequest, refetch,  loading, handleAction}) => {
    console.log(ambulanceRequest)
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
            {!loading? (
              <table className=" table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>From</th>
                    <th>Destination</th>
                    <th>Patient</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Time</th>
                   
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ambulanceRequest?.map((request,idx) => (
                    <tr key={request._id}>
                      <td>{idx +1}</td>
                      <td>{request?.from}</td>
                      
                      <td>{request?.destination}</td>
                      <td>{request?.name}</td>
                      <td>{request?.patient?.email}</td>
                      <td>{request.date}</td>
                      <td>{request.timeSlot}</td>
                      <td>{request?.status}</td>
                      <td><button onClick={()=>handleAction(request?._id)} className={request?.status !== 'accept' ? 'btn btn-error': 'btn btn-secondary'}>{request?.status === 'active'? 'Block' : 'Unblock'}</button></td>
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

export default RequestedAmbulance;