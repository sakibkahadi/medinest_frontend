import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';

const usePatient = (searchTerm = "") => {
    const axiosSecure = useAxiosSecure();

    const { data: patients = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['patients', searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get('patients', {
                params: { searchTerm: searchTerm || undefined } 
            });
            return res.data.data;
        },
        // Only refetch when searchTerm changes
        enabled: true 
    });

    return [patients, loading, refetch];
};

export default usePatient;
