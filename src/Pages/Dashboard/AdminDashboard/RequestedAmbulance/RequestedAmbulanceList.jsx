import NoData from '@/customComponents/iconComponents/NoData';
import useRequestedAmbulance from '@/Hooks/useRequestedAmbulance';
import React, { useState } from 'react';
import { TfiMenuAlt } from 'react-icons/tfi';
import RequestedAmbulance from './RequestedAmbulance';

const RequestedAmbulanceList = () => {
    const [requestedAmbulances, loading, refetch] = useRequestedAmbulance()
    const [isLoading, setIsLoading] = useState(false)

  const handleAction =()=>{
    console.log('hi')
  }
    return (
        <div className="w-full  border-2 rounded-sm h-full border-stone-400 ">
        <div >
          <div className=" flex items-center bg-[#099635] text-black  gap-6  h-[70px] pl-6 py-1 ">
    
          <div className="flex items-center gap-2 text-white py-2 px-3 text-lg font-semibold border-b-2 border-white  ">
          <span><TfiMenuAlt></TfiMenuAlt></span> Request List
            </div>
            
        
           
          </div>
          {
            isLoading ? <p>loading....</p> : <RequestedAmbulance ambulanceRequest={requestedAmbulances} handleAction ={handleAction}  loading={loading} refetch={refetch} />  
          }
          
        </div>
        
        </div>
    );
};

export default RequestedAmbulanceList;