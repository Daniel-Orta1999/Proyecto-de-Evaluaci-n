import axios from 'axios';

const API_URL = 'https://gorest.co.in/public/v2/';
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});
const token = "355978d0c49eef7a7ce8c0a058ae5523734d3c81fb4fc43c86be9686438ca0b0";

export const getDatos = async () => {
    try {
        const response = await axiosInstance.get('/users');
        console.log(response.data);
        return response;
    } catch (error) {
        throw new Error(`Error al obtener datos: ${error}`);
    }
};

export const postUser = async (formData: any) => {
    try {
        const response = await axiosInstance.post('/users', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data; 
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error}`);
    }
};

export const deleteUser = async (id: any) => {
    try {
        const response = await axiosInstance.delete(`/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log(response)
        return response.status; 
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error}`);
    }
};