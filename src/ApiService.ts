import axios from 'axios';

const API_URL = 'https://gorest.co.in/public/v2/';
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export const getDatos = async () => {
    try {
        const response = await axiosInstance.get('/users');
        console.log(response.data);
        return response;
    } catch (error) {
        throw new Error(`Error al obtener datos: ${error}`);
    }
};
