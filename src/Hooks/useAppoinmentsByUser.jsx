import { useQuery } from '@tanstack/react-query';


import useAxiosPublic from './useAxiosPublic';

const useAppointmentByUser = () => {
    const axiosPublic = useAxiosPublic()
 
    const {data: appointments =[], isPending:loading , refetch} = useQuery({
        queryKey:['appointments'],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/appointments/${localStorage.getItem('userEmail')}`);
            return res.data.data
        }
    })
    return [appointments, loading, refetch ]
};


export default useAppointmentByUser;