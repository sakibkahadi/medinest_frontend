import { useQuery } from '@tanstack/react-query';


import useAxiosPublic from './useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';


const useClinicByAdmin = () => {
    const {userData} = useContext(AuthContext)
    console.log(userData._id) 
    const axiosPublic = useAxiosPublic()
    const {data: clinicsByAdmin =[], isPending:loading , refetch} = useQuery({
        queryKey:['clinicsByAdmin'],
        queryFn:async()=>{
            loading(true)
            const res = await axiosPublic.get(`/clinics/${userData?._id}/admins`);
       
            return res.data.data._id
        }
    })
    return [clinicsByAdmin, loading, refetch ]
};

export default useClinicByAdmin;