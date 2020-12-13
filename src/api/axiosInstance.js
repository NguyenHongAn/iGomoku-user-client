import axios from 'axios';
const baseURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_API_DEPLOY_URL;

console.log(baseURL);
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE",
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept,Authorization",
    }
});

axiosInstance.interceptors.request.use((config) => {
    //if token is exists, set header
  
});

export default axiosInstance;



