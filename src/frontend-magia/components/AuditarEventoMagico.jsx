import React, { useState } from 'react';
import sistemaMagicoService from '../service/sistemaMagicoService';

export default function AuditarEventoMagico() {
    const [eventoId, setEventoId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await sistemaMagicoService.auditarEventoMagico(eventoId);
            setSuccess(response.data);
        } catch (err) {
            setError('Error auditando evento: ' + (err.response?.data || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={{ ...styles.cornerEffects, ...styles.topLeft }}></div>
            <div style={{ ...styles.cornerEffects, ...styles.topRight }}></div>
            <div style={{ ...styles.cornerEffects, ...styles.bottomLeft }}></div>
            <div style={{ ...styles.cornerEffects, ...styles.bottomRight }}></div>
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
                    disabled={loading}
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
        background: 'linear-gradient(135deg, #1b263b, #0d1b2a)',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        position: 'relative',
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
        boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)', // Aura effect
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
        boxShadow: '0 0 10px rgba(255, 255, 0, 0.5)', // Aura effect
    },
    buttonHover: {
        backgroundColor: '#d4af37',
    },
    success: {
        color: 'green',
        marginBottom: '15px',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)', // Aura effect
    },
    error: {
        color: 'red',
        marginBottom: '15px',
        boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)', // Aura effect
    },
    cornerEffects: {
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
    },
    topLeft: {
        top: '-10px',
        left: '-10px',
        background: 'radial-gradient(circle, red, orange)',
    },
    topRight: {
        top: '-10px',
        right: '-10px',
        background: 'radial-gradient(circle, brown, green)',
    },
    bottomLeft: {
        bottom: '-10px',
        left: '-10px',
        background: 'radial-gradient(circle, blue, cyan)',
    },
    bottomRight: {
        bottom: '-10px',
        right: '-10px',
        background: 'radial-gradient(circle, lightgray, white)',
    },
};