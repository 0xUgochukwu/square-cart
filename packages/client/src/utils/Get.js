import axios from "axios";
import api from "../configs/endpoint";

const get = axios.create({
    baseURL: api,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
});

export default get;
