import axios from "axios";

export const SERVER_NAME = "https://localhost:44376/";

const axiosClient = axios.create({
  baseURL: `${SERVER_NAME}api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

export default axiosClient;
