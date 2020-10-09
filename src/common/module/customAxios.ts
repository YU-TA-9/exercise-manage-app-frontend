import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    // 認証トークンをヘッダーに付与
    config.headers.common['Authorization'] = 'Bearer ' + process.env.TOKEN;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
