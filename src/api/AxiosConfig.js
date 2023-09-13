import axios from "axios";
import { API_BASE_URL, API_CONTENT_TYPE } from "../common/AppConstant";

// const api = () =>{

//     const  axiosConfig = axios.create({
//         baseURL: API_BASE_URL,
//         // withCredentials: true,

//     headers:{
//         common : {"Content-Type" : API_CONTENT_TYPE}
//     }
//     });
//     // axiosConfig.defaults.headers.common["Content-Type"] = API_CONTENT_TYPE;
//     return axiosConfig;

// } 

// export default api;

export const api = axios.create({
    baseURL: API_BASE_URL,
    // withCredentials: true,

    headers: {
        common: { "Content-Type": API_CONTENT_TYPE }
    }
}); 