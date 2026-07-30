// lib/api.ts
import axios from "axios";
import { refreshSession } from "@/api/auth";

const api = axios.create({ baseURL: "/api" });

let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

const getRefresh = () => localStorage.getItem("smk_refresh");
const onRefreshed = (newToken: string) => {
  queue.forEach((cb) => cb(newToken));
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retried) {
      original._retried = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((newToken: string) => {
            original.headers["Authorization"] = `Session-Token ${newToken}`;
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = getRefresh();
        if (!refreshToken) throw new Error("no refresh token");

        const data = await refreshSession(refreshToken);
        const newToken = data.token;
        localStorage.setItem("smk_token", newToken);
        if (data.refresh_token) localStorage.setItem("smk_refresh", data.refresh_token);
        api.defaults.headers.common["Authorization"] = `Session-Token ${newToken}`;

        onRefreshed(newToken);
        original.headers["Authorization"] = `Session-Token ${newToken}`;
        return api(original);
      } catch (refreshError) {
        localStorage.removeItem("smk_token");
        localStorage.removeItem("smk_refresh");
        delete api.defaults.headers.common["Authorization"];
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;