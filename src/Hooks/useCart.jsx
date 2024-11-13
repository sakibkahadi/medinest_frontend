import { useQuery } from '@tanstack/react-query';


import useAxiosPublic from './useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';



const useCart = () => {
    const axiosPublic = useAxiosPublic()
   const {user} = useContext(AuthContext)
    const {data: carts =[], isPending:loading , refetch} = useQuery({
        queryKey:['carts'],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/carts/${localStorage.getItem('userEmail')}`);
            return res.data.data
        }
    })
    return [carts, loading, refetch ]
};

export default useCart;