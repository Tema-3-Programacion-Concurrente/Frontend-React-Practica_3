import axios from 'axios';

const API_URL = '/api/auth/';

const login = (email, password) => {
    return axios.post(`${API_URL}login`, {
        correo: email,
        contrasena: password,
    });
};

const register = (userData, role) => {
    return axios.post(`${API_URL}register?rol=${role}`, userData);
};

const authService = {
    login,
    register,
};

export default authService;
