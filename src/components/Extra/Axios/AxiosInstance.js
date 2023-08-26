import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Создаем инстанс Axios
const instance = axios.create({
  baseURL: 'https://puzzle.araratchess.ru:8080/api', // Замените на ваш базовый URL
});

instance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('Auth');

    if (token) {
      // config.headers.Authorization = `Bearer ${token.refreshToken}`;
      const data = JSON.parse(token);
      config.headers.Authorization = `Bearer ${data.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
