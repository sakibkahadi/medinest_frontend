import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useMedicine= (searchTerm = "") => {
    const axiosPublic = useAxiosPublic();

    const { data: medicines = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['medicines', searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get('medicines', {
                params: { searchTerm: searchTerm || undefined } 
            });
            return res.data.data;
        },
        // Only refetch when searchTerm changes
        enabled: true 
    });

    return [medicines, loading, refetch];
};




export default useMedicine;