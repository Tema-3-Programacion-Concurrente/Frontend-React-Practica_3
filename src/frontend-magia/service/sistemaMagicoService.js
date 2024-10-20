import axios from 'axios';

const API_URL = '/api/sistema-magico/';

const lanzarHechizo = (usuario, hechizo) => {
    return axios.post(`${API_URL}lanzar-hechizo`, {
        usuario,
        hechizo,
    });
};

const registrarEventoMagico = (usuario, hechizo) => {
    return axios.post(`${API_URL}registrar-evento-magico`, {
        usuario,
        hechizo,
    });
};

const auditarEventoMagico = (eventoId) => {
    return axios.post(`${API_URL}auditar-evento-magico`, { eventoId });
};

const sistemaMagicoService = {
    lanzarHechizo,
    registrarEventoMagico,
    auditarEventoMagico,
};

export default sistemaMagicoService;
