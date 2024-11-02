import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const config: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
};

const api = axios.create(config);

api.interceptors.request.use(
	async (config) => {
		const token = Cookies.get("SIMS-PPOB-MARIO");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const { response } = error;

		if (response && response.status === 401) {
			Cookies.remove("SIMS-PPOB-MARIO");
		}

		return Promise.reject(error);
	}
);

export default api;
