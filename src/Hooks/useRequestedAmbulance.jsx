import { useQuery } from '@tanstack/react-query';



import useAxiosSecure from './useAxiosSecure';


const useRequestedAmbulance = (searchTerm = "") => {
    const axiosPublic = useAxiosSecure()
    const {data: requestedAmbulances =[], isLoading: loading, refetch } = useQuery({
        queryKey: ['requestedAmbulances', searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get('requestedAmbulances', {
                params: { searchTerm: searchTerm || undefined } 
            });
            return res.data.data;
        },
        // Only refetch when searchTerm changes
        enabled: true 
    });

    return [requestedAmbulances, loading, refetch];
};


export default useRequestedAmbulance;