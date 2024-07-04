import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

// 토큰을 동적으로 설정하고 memberId를 헤더에 추가하기 위한 request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      const decodedToken = jwtDecode(token);
      if (decodedToken.memberId) {
        config.headers.memberId = decodedToken.memberId;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
