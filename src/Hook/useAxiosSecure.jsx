import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: "https://cr-doctor-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {

    const {logout} = UseAuth();

    useEffect(()=> {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            // console.log('error tracked in the interceptor', error.response);
            if(error.response.status === 401 || error.response.status === 403){
                // console.log('logout the user');
                logout();
            }
        })
    },[])

  return axiosSecure;
};

export default useAxiosSecure;
