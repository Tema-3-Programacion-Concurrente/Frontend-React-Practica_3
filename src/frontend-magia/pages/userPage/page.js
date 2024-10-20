// UserPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanzarHechizo from '../../components/LanzarHechizo';

export default function UserPage() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Usuario - Lanzar Hechizo</h2>
            <LanzarHechizo />
            <button style={styles.button} onClick={() => navigate('/')}>Ir a Home</button>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
    },
    button: {
        margin: '10px 0',
        padding: '10px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};