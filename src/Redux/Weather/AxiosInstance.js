import axios from 'axios';

const token = 'bearer ' + localStorage.getItem("token")
const instance = axios.create({
  baseURL: `http://localhost:3009/api/`,
})

instance.interceptors.request.use((config)=>{
  config.headers.common['Authorization'] = token
return config
})

export default instance;
