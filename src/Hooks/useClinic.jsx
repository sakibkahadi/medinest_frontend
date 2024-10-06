
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useClinic = () => {
    const axiosPublic = useAxiosPublic()
    const {data: clinics =[], isPending:loading , refetch} = useQuery({
        queryKey:['clinics'],
        queryFn:async()=>{
            const res = await axiosPublic.get('clinics');
            return res.data.data
        }
    })
    return [clinics, loading, refetch ]
};

export default useClinic;