import axios from 'axios'
import store from "../store/store";
import { getToken} from "./auth";

const request = axios.create({
  baseURL: 'http://13.229.233.177/login/public/api',
  timeout: 3000
});
request.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  }
);
request.interceptors.response.use(response =>{
  response = response.data
  return response
});

export default request