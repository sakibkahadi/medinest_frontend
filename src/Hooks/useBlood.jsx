
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';



const useBlood= (searchTerm = "") => {
    const axiosPublic = useAxiosPublic();

    const { data: bloods = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['bloods', searchTerm],
        queryFn: async () => {
            const res = await axiosPublic.get('bloodBank', {
                params: { searchTerm: searchTerm || undefined } 
            });
            return res.data.data;
        },
        // Only refetch when searchTerm changes
        enabled: true 
    });

    return [bloods, loading, refetch];
};

export default useBlood;