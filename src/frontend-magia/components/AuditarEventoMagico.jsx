import React, { useState } from 'react';
import sistemaMagicoService from '../service/sistemaMagicoService';

export default function AuditarEventoMagico() {
    const [eventoId, setEventoId] = useState(''); // Estado para almacenar el ID del evento
    const [success, setSuccess] = useState(''); // Estado para el mensaje de éxito
    const [error, setError] = useState(''); // Estado para el mensaje de error
    const [loading, setLoading] = useState(false); // Estado para controlar el estado de carga

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos
        setSuccess(''); // Limpiar mensajes de éxito previos
        setLoading(true); // Activar el estado de carga

        try {
            const response = await sistemaMagicoService.auditarEventoMagico(eventoId); // Llamada al servicio
            setSuccess(response.data); // Mostrar el mensaje de éxito
        } catch (err) {
            // Manejo de errores más detallado
            setError('Error auditando evento: ' + (err.response?.data || err.message));
        } finally {
            setLoading(false); // Desactivar el estado de carga
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Auditar Evento Mágico</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="ID del Evento"
                    value={eventoId}
                    onChange={(e) => setEventoId(e.target.value)}
                    required
                    style={styles.input}
                    disabled={loading} // Deshabilitar el input mientras se procesa la solicitud
                />
                <button type="submit" style={styles.button} disabled={loading || !eventoId}>
                    {loading ? 'Auditando...' : 'Auditar'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'linear-gradient(135deg, #000000, #0d1b2a)',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#f0e130',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#1b263b',
        color: '#ffffff',
    },
    button: {
        padding: '10px',
        backgroundColor: '#f0e130',
        color: '#000000',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#d4af37',
    },
    success: {
        color: 'green',
        marginBottom: '15px',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
};