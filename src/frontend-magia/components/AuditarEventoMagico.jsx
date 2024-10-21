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
    );
}

const styles = {
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

/*
VERSION SEGURA Y GENERICA
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
    );
}

const styles = {
    container: {
        backgroundColor: '#1A1A1D', // Dark elegant background
        color: '#F0E6D2', // Light color for text
        padding: '20px',
        width: '300px', // Width to align to the left
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
        fontFamily: '"Cinzel", serif', // Classic and magical font style
        border: '2px solid #B28D42',
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
*/





/*

VERSION 3 LA MAS POCHA:
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
};*/