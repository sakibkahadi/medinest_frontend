
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useDepartment= (searchTerm = "") => {
    const axiosPublic = useAxiosPublic();

    const { data: departments = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['departments', searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get('departments', {
                params: { searchTerm: searchTerm || undefined } 
            });
            return res.data.data;
        },
        // Only refetch when searchTerm changes
        enabled: true 
    });

    return [departments, loading, refetch];
};

export default useDepartment;