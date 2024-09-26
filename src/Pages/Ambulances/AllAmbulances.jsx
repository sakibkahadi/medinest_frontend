
import { useEffect, useState } from 'react';
import AmbulanceCard from './AmbulanceCard';


import useAxiosSecure from '@/Hooks/useAxiosSecure';

const AllAmbulances = () => {
const [ambulances, setAmbulances] = useState([])
const axiosSecure = useAxiosSecure()
useEffect(()=>{
    axiosSecure.get(`http://localhost:5000/api/ambulances`)
  .then(response => {
    setAmbulances(response.data.data);
  })
},[axiosSecure])
    // console.log(ambulances)
    return (
        <div> <h1 className=' bg-slate-200 text-blue-900 rounded-md p-2 font-bold text-lg text-center'>All Ambulances</h1>
            <div className='flex flex-col gap-10 '>
                {
                   ambulances?.map(ambulance=><AmbulanceCard ambulance={ambulance} key={ambulance._id}></AmbulanceCard>)
                }
            </div>
            
        </div>
    );
};

export default AllAmbulances;