import axios  from "axios";

const axiosPublic = axios.create({
    baseURL:'https://healthcare-backend-node.vercel.app/api'
})

const useAxiosPublic = ()=>{
    return axiosPublic
}
export default useAxiosPublic;