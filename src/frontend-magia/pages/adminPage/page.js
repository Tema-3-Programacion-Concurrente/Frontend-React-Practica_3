// AdminPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GestionarHechizos from '../../components/GestionarHechizos';
import GestionarSeguridad from '../../components/GestionarSeguridad';
import AuditarEventoMagico from '../../components/AuditarEventoMagico';

export default function AdminPage() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Panel de Administración</h2>
            <button style={styles.button} onClick={() => navigate('/')}>Ir a Home</button>

            <div style={styles.section}>
                <h3>Hechizos Disponibles</h3>
                <GestionarHechizos />
            </div>

            <div style={styles.section}>
                <h3>Registros de Seguridad</h3>
                <GestionarSeguridad />
            </div>

            <div style={styles.section}>
                <h3>Auditar Evento Mágico</h3>
                <AuditarEventoMagico />
            </div>
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
    section: {
        margin: '20px 0',
    },
};