
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';



const useDoctor= (searchTerm = "") => {
    const axiosPublic = useAxiosPublic();

    const { data: doctors = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['doctors', searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get('doctors', {
                params: { searchTerm: searchTerm || undefined } 
            });
            return res.data.data;
        },
        // Only refetch when searchTerm changes
        enabled: true 
    });

    return [doctors, loading, refetch];
};

export default useDoctor;