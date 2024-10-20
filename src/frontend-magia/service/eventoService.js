import axios from 'axios';

const API_URL = '/api/eventos-magicos/';

const getEventoById = (id) => {
    return axios.get(`${API_URL}${id}`);
};

const getAllEventos = () => {
    return axios.get(API_URL);
};

const createEvento = (eventoData) => {
    return axios.post(API_URL, eventoData);
};

const updateEvento = (id, eventoData) => {
    return axios.put(`${API_URL}${id}`, eventoData);
};

const deleteEvento = (id) => {
    return axios.delete(`${API_URL}${id}`);
};

const eventoService = {
    getEventoById,
    getAllEventos,
    createEvento,
    updateEvento,
    deleteEvento,
};

export default eventoService;
