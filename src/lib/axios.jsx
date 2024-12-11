import axios from "axios";

const axiosClient = axios.create({
    // baseURL:'https://api.freeapi.app/api/v1'
    baseURL:'https://dummyjson.com'
    
});
axiosClient.interceptors.request.use(function (config) {
    // LocalStorage se token fetch karna
    const data = JSON.parse(localStorage.getItem('E-loginUser')); // LocalStorage se data lete hain
    if (data && data.accessToken) {
        config.headers.Authorization = `Bearer ${data.accessToken}`; // Access token ko header mein add karte hain
    }
    return config;  
}, function (error) {
    // Error handle karna agar koi problem ho
    return Promise.reject(error);
});

export default axiosClient;