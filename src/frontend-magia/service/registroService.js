import axios from 'axios';

const API_URL = '/api/registros/';

const getRegistroById = (id) => {
    return axios.get(`${API_URL}${id}`);
};

const getAllRegistros = () => {
    return axios.get(API_URL);
};

const createRegistro = (registroData) => {
    return axios.post(API_URL, registroData);
};

const updateRegistro = (id, registroData) => {
    return axios.put(`${API_URL}${id}`, registroData);
};

const deleteRegistro = (id) => {
    return axios.delete(`${API_URL}${id}`);
};

const registroService = {
    getRegistroById,
    getAllRegistros,
    createRegistro,
    updateRegistro,
    deleteRegistro,
};

export default registroService;
