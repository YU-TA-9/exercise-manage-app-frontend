import axios from 'axios';

const instance = axios.create({ baseURL: process.env.HOST_URL });

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

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
    } else {
      alert('Error');
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
