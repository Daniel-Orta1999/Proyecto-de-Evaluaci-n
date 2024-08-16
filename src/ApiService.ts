import axios from 'axios';
const API_URL = 'https://localhost:52929/api/';
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});
//Servicio para llamadas al back 
export const getDatos = async () => {//EndPoint que Trae todos el listado de usuarios
    try {
        const response = await axiosInstance.get(`Test/Usuarios`);
        return response.data.data;
    } catch (error) {
        throw new Error(`Error al obtener datos: ${error}`);
    }
};

export const postUser = async (formData: any) => {//Llamada al endpoit para registrar un usuario
    try {
        const response = await axiosInstance.post('Test/RegistrarUsuario', formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error}`);
    }
};

export const deleteUser = async (id: any) => {//Llamada al endpoint para eliminar un  usuario
    try {
        const response = await axiosInstance.delete(`Test/EliminarUsuario?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.status;
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error}`);
    }
};

export const putUser = async (formData: any) => {//Llamada al endpoint para eliminar un usuario
    try {
        const response = await axiosInstance.put(`Test/ActualizarUsuario`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error}`);
    }
};
