import React, { useState } from 'react';
import sistemaMagicoService from '../service/sistemaMagicoService';

export default function AuditarEventoMagico() {
    const [eventoId, setEventoId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [element, setElement] = useState(''); // New state to track the element

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await sistemaMagicoService.auditarEventoMagico(eventoId);
            setSuccess(response.data);
            // Set the element based on the response or eventoId
            if (eventoId.includes('agua')) {
                setElement('agua');
            } else if (eventoId.includes('fuego')) {
                setElement('fuego');
            } else if (eventoId.includes('roca')) {
                setElement('roca');
            } else if (eventoId.includes('aire')) {
                setElement('aire');
            }
        } catch (err) {
            setError('Error auditando evento: ' + (err.response?.data || err.message));
        } finally {
            setLoading(false);
        }
    };

    const getGlowColor = () => {
        switch (element) {
            case 'agua':
                return '0 0 20px 5px blue';
            case 'fuego':
                return '0 0 20px 5px red';
            case 'roca':
                return '0 0 20px 5px brown';
            case 'aire':
                return '0 0 20px 5px lightgray';
            default:
                return '0 0 20px 5px #B28D42';
        }
    };

    return (
        <div style={styles.outerContainer}>
            <div style={{ ...styles.container, boxShadow: getGlowColor() }}>
                <h2 style={styles.header}>Auditar Evento Mágico</h2>
                {error && <p style={styles.errorMessage}>{error}</p>}
                {success && <p style={styles.successMessage}>{success}</p>}
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
        </div>
    );
}

const styles = {
    outerContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0', // Add padding to position it vertically
    },
    container: {
        backgroundColor: '#1A1A1D', // Dark elegant background
        color: '#F0E6D2', // Light color for text
        padding: '20px',
        width: '300px', // Width to align to the left
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
        fontFamily: '"Cinzel", serif', // Classic and magical font style
        border: '2px solid #B28D42',
        position: 'relative',
    },
    header: {
        textAlign: 'center',
        fontSize: '28px',
        marginBottom: '20px',
        letterSpacing: '2px',
        color: '#B28D42', // Golden touches
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #B28D42',
        backgroundColor: '#333333',
        color: '#F0E6D2',
        transition: 'all 0.3s',
    },
    button: {
        padding: '12px',
        fontSize: '18px',
        borderRadius: '5px',
        backgroundColor: '#B28D42',
        color: '#1A1A1D',
        cursor: 'pointer',
        border: 'none',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#C59B5F',
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
    },
};
