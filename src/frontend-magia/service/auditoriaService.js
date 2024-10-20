import axios from 'axios';

const API_URL = '/api/auditorias/';

const getAuditoriaById = (id) => {
    return axios.get(`${API_URL}${id}`);
};

const getAllAuditorias = () => {
    return axios.get(API_URL);
};

const createAuditoria = (auditoriaData) => {
    return axios.post(API_URL, auditoriaData);
};

const updateAuditoria = (id, auditoriaData) => {
    return axios.put(`${API_URL}${id}`, auditoriaData);
};

const deleteAuditoria = (id) => {
    return axios.delete(`${API_URL}${id}`);
};

const auditoriaService = {
    getAuditoriaById,
    getAllAuditorias,
    createAuditoria,
    updateAuditoria,
    deleteAuditoria,
};

export default auditoriaService;
