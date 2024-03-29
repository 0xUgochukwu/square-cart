import axios from "axios";
import api from "../configs/endpoint";

const token = () => {
    return localStorage.getItem("token");
};

const instance = axios.create({
    baseURL: api,
    headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "application/json",
    },
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response?.status == 403) {
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        }

        return Promise.reject(error);
    }
);

export default instance;
