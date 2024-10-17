import { useQuery } from '@tanstack/react-query';



import useAxiosSecure from './useAxiosSecure';


const useRequestedAmbulance = () => {
    const axiosPublic = useAxiosSecure()
    const {data: requestedAmbulances =[], isPending:loading , refetch} = useQuery({
        queryKey:['requestedAmbulances'],
        queryFn:async()=>{
            const res = await axiosPublic.get('requestedAmbulances');
            return res.data.data
        }
    })
    return [requestedAmbulances, loading, refetch ]
};

export default useRequestedAmbulance;