import { useQuery } from '@tanstack/react-query';


import useAxiosPublic from './useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';



const usePaymentHistory = () => {
    const axiosPublic = useAxiosPublic()
 
    const {data: paymentHistory =[], isPending:loading , refetch} = useQuery({
        queryKey:['paymentHistory'],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/payments/${localStorage.getItem('userEmail')}`);
            
            return res.data.data
        }
    })
    return [paymentHistory, loading, refetch ]
};

export default usePaymentHistory;