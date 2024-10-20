import React, { useState } from 'react';
import sistemaMagicoService from '../../service/sistemaMagicoService';

export default function RegistrarEventoMagico() {
    const [hechizo, setHechizo] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await sistemaMagicoService.registrarEventoMagico(usuarioId, hechizo);
            setSuccess(response.data);
        } catch (err) {
            setError('Error al registrar evento: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div>
            <h2>Registrar Evento Mágico</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID de Usuario"
                    value={usuarioId}
                    onChange={(e) => setUsuarioId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Hechizo"
                    value={hechizo}
                    onChange={(e) => setHechizo(e.target.value)}
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}
