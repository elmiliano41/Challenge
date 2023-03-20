import axios from "axios";

const AxiosClient = axios.create({
  baseURL: process.env.VITE_BACKEND_URL,
});

export default AxiosClient;
