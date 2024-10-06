import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';


const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const {data: admins =[], isPending:loading , refetch} = useQuery({
        queryKey:['admins'],
        queryFn:async()=>{
            const res = await axiosSecure.get('admins');
            return res.data.data
        }
    })
    return [admins, loading, refetch ]
};

export default useAdmin;