// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Sistema Mágico</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate('/login')}>Iniciar Sesión</button>
                <button style={styles.button} onClick={() => navigate('/register')}>Registrar Cuenta</button>
            </div>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate('/admin')}>Panel de Administración</button>
                <button style={styles.button} onClick={() => navigate('/user')}>Acceso Usuario</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
    },
    title: {
        fontSize: '36px',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginBottom: '20px',
    },
    button: {
        padding: '15px 30px',
        margin: '10px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
