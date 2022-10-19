import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
// import { envConfig } from 'config';
// import Cookies from 'js-cookie';
import { API_CONFIGS } from './constants';

export const apiClient = axios.create({
  baseURL: API_CONFIGS.END_POINT,
  // timeout: 1000 * 30,
});

apiClient.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken && requestConfig.baseURL === API_CONFIGS.END_POINT) {
    (requestConfig.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${accessToken}`;
  }
  return requestConfig;
});

// apiClient.interceptors.response.use(
//   (res) => res,
//   async (error: AxiosError) => {
//     throw error;
//   },
// );
