import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useClinic = (searchTerm = "") => {
    const axiosPublic = useAxiosPublic();

    const { data: clinics = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['clinics', searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get('clinics', {
                params: { searchTerm: searchTerm || undefined } 
            });
            return res.data.data;
        },
        // Only refetch when searchTerm changes
        enabled: true 
    });

    return [clinics, loading, refetch];
};

export default useClinic;
