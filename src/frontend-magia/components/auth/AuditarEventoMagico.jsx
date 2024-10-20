import React, { useState } from 'react';
import sistemaMagicoService from '../../service/sistemaMagicoService';

export default function AuditarEventoMagico() {
    const [eventoId, setEventoId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await sistemaMagicoService.auditarEventoMagico(eventoId);
            setSuccess(response.data);
        } catch (err) {
            setError('Error auditando evento: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div>
            <h2>Auditar Evento Mágico</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID del Evento"
                    value={eventoId}
                    onChange={(e) => setEventoId(e.target.value)}
                />
                <button type="submit">Auditar</button>
            </form>
        </div>
    );
}
