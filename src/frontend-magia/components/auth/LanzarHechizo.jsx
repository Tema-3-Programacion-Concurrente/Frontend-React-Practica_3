import React, { useState } from 'react';
import sistemaMagicoService from '../../service/sistemaMagicoService';

export default function LanzarHechizo() {
    const [hechizo, setHechizo] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await sistemaMagicoService.lanzarHechizo(usuarioId, hechizo);
            setSuccess(response.data);
        } catch (err) {
            setError('Error lanzando el hechizo: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div>
            <h2>Lanzar Hechizo</h2>
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
                <button type="submit">Lanzar</button>
            </form>
        </div>
    );
}
