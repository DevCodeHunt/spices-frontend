import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let store: any;

export const injectStore = (_store: any) => {
    store = _store;
};

axiosPrivate.interceptors.request.use(
    (config) => {
        const token = store?.getState()?.user?.token;



        if (token) {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);