import axios from 'axios';
import {useSelector} from 'react-redux';

const baseURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_API_DEPLOY_URL;


const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE",
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept,x-access-token",
    }
});

axiosInstance.interceptors.request.use((config) => {
    //if token is exists, set header
    const token = useSelector(state => state.auth.jwtToken);
    if (token !== "invalid token :))")
    {
      config.headers["x-access-token"] = token;
    }
    return config;
});

export default axiosInstance;



