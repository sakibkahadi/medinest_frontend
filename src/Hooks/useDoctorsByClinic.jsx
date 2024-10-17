import { useQuery } from '@tanstack/react-query';


import useAxiosPublic from './useAxiosPublic';
import useClinicByAdmin from './useClinicByAdmin';


const useDoctorsByClinic = () => {
    const axiosPublic = useAxiosPublic()
    const [clinicsByAdmin] = useClinicByAdmin()
    console.log(clinicsByAdmin)
    const {data: doctorsByClinic =[], isPending:loading , refetch} = useQuery({
        queryKey:['doctorsByClinic'],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/doctors/${clinicsByAdmin}`);
            return res.data.data._id
        }
    })
    return [doctorsByClinic, loading, refetch ]
};

export default useDoctorsByClinic;