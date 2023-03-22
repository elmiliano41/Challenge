import axios from 'axios';
import { getEnvVariables } from './getEnvVariables';

const { VITE_BACKEND_URL } = getEnvVariables();

const AxiosClient = axios.create({
  baseURL: VITE_BACKEND_URL,
});

AxiosClient.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };
  return config;
});

export default AxiosClient;
