import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAmbulance= (searchTerm = "") => {
    const axiosPublic = useAxiosPublic();

    const { data: ambulances = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['ambulances', searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get('ambulances', {
                params: { searchTerm: searchTerm || undefined } 
            });
            return res.data.data;
        },
        // Only refetch when searchTerm changes
        enabled: true 
    });

    return [ambulances, loading, refetch];
};




export default useAmbulance;