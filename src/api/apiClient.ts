import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.kinopoisk.dev/v1.4/',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    config.headers['X-API-KEY'] = '6TMEXJY-WQJ4FQ3-JACA4E5-BGC73B9';
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            console.error('Ошибка 401: Неверный или отсутствующий токен');
        }
        return Promise.reject(error);
    }
);

export default apiClient;