import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000/api'
})

const useAxiosSecure = ()=>{
    const navigate = useNavigate();
    const {logOut} = useAuth()

    //request interceptor to add authorization header for every secure call to the api

    axiosSecure.interceptors.request.use(function(config){

        const token = localStorage.getItem('access-token')
        // console.log('requested stopped by interceptors before adding token', token)
        config.headers.authorization = `Bearer ${token}`;
        return config

    },function(error){
        //do something with request error
        return Promise.reject(error)
    })

    //intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response
    },async(error)=>{
        const status= error.response.status
        // console.log('status error in the interceptor ',error)
        // for 401 and 403 logout the use and more the user to the login
        if(status ===401 || status===403 || status ===400){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure;



}

export default useAxiosSecure;