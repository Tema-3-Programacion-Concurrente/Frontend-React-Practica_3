import axios from 'axios';

const API_URL = '/api/hechizos/';

const getHechizoById = (id) => {
    return axios.get(`${API_URL}${id}`);
};

const getAllHechizos = () => {
    return axios.get(API_URL);
};

const createHechizo = (hechizoData) => {
    return axios.post(API_URL, hechizoData);
};

const updateHechizo = (id, hechizoData) => {
    return axios.put(`${API_URL}${id}`, hechizoData);
};

const deleteHechizo = (id) => {
    return axios.delete(`${API_URL}${id}`);
};

const hechizoService = {
    getHechizoById,
    getAllHechizos,
    createHechizo,
    updateHechizo,
    deleteHechizo,
};

export default hechizoService;
