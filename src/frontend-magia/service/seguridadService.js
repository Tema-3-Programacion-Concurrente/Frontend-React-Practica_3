import axios from 'axios';

const API_URL = '/api/seguridad/';

const getSeguridadById = (id) => {
    return axios.get(`${API_URL}${id}`);
};

const getAllSeguridades = () => {
    return axios.get(API_URL);
};

const createSeguridad = (seguridadData) => {
    return axios.post(API_URL, seguridadData);
};

const updateSeguridad = (id, seguridadData) => {
    return axios.put(`${API_URL}${id}`, seguridadData);
};

const deleteSeguridad = (id) => {
    return axios.delete(`${API_URL}${id}`);
};

const seguridadService = {
    getSeguridadById,
    getAllSeguridades,
    createSeguridad,
    updateSeguridad,
    deleteSeguridad,
};

export default seguridadService;
