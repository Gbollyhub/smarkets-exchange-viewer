import axios from "axios";

const api = axios.create({ baseURL: "/api" });

// attach the stored token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("smk_token");
  if (token) {
    config.headers["Authorization"] = `Session-Token ${token}`;
  }
  return config;
});

// on a 401, the session is dead: clear it and send the user to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("smk_token");
      // avoid a redirect loop if the failing request is the login call itself
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;