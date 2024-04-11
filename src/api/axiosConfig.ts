import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:44376/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

export default axiosClient;
