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

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = "JWT " + access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/token/"
    ) {
      originalRequest._retry = true;

      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token) {
        const token_parts = JSON.parse(
          atob(refresh_token.split(".")[1])
        );
        const now = Math.ceil(Date.now() / 1000);

        if (token_parts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refresh_token })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers[
                "Authorization"
              ] = `JWT ${response.data.access}`;

              originalRequest.headers[
                "Authorization"
              ] = `JWT ${response.data.access}`;

              return axiosInstance(originalRequest);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("Refresh token is expired", token_parts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;