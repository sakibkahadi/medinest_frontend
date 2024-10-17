import { useQuery } from '@tanstack/react-query';


import useAxiosPublic from './useAxiosPublic';


const useUser = () => {
    const axiosPublic = useAxiosPublic()
    const {data: users =[], isPending:loading , refetch} = useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res = await axiosPublic.get('users');
            return res.data.data
        }
    })
    return [users, loading, refetch ]
};

export default useUser;