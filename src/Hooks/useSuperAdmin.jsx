import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useSuperAdmin = (searchTerm = "") => {
    const axiosPublic = useAxiosPublic();

    const { data: superAdmins = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['superAdmins', searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get('superAdmins', {
                params: { searchTerm: searchTerm || undefined } 
            });
            return res.data.data;
        },
        // Only refetch when searchTerm changes
        enabled: true 
    });

    return [superAdmins, loading, refetch];
};

export default useSuperAdmin;
