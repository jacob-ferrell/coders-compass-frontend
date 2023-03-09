import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const getRefreshToken = () => localStorage.getItem("refresh_token");

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return new Promise(async (resolve) => {
      const originalRequest = error.config;
      const refresh_token = getRefreshToken();
      if (!refresh_token) resolve(window.location.href = '/login')
      if (error.response?.status === 401 && refresh_token) {
        let response;
        try {
          originalRequest._retry = true;
          response = await refreshToken(originalRequest);
        } catch (e) {
          return Promise.reject(e);
        }
        resolve(response);
      }
    });
  }
);

async function refreshToken(originalRequest = null) {
  const refresh_token = getRefreshToken();
  if (!refresh_token) return;
  try {
    const response = await axiosInstance.post("token/refresh/", {
      refresh: refresh_token,
    });
    const newAccessToken = response.data.access;
    const newRefreshToken = response.data.refresh;
    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token", newRefreshToken);
    axiosInstance.defaults.headers.Authorization = `JWT ${newAccessToken}`;
    if (originalRequest) {
      originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
    }
    return axiosInstance(originalRequest);
  } catch (error) {
    console.log("Error refreshing token: ", error);
    // Handle error
    throw error;
  }
}

export default axiosInstance;
