import axios from "axios";
import cache from "../utils/cache";
const api_url = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: api_url,
  timeout: 5000
});

let token = null;

if (cache.hasThis("token")) {
  token = `Bearer ${cache.getItem("token")}`;
}

instance.defaults.headers.common["Authorization"] = token;

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let errData = {
      message: "No tienes conexion a Internet",
      status_code: "offline",
      success: false,
      details: null,
      data: null
    };
    const { response: res } = error;
    if (res) {
      errData = res.data;
    }
    return Promise.reject(errData);
  }
);

export default instance;
