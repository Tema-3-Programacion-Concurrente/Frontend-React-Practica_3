// AdminPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GestionarHechizos from '../../components/GestionarHechizos';
import AuditarEventoMagico from '../../components/AuditarEventoMagico';
import eventoService from '../../service/eventoService';

export default function AdminPage() {
    const [eventos, setEventos] = useState([]);
    const [selectedEventoId, setSelectedEventoId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Obtener eventos mágicos al cargar la página
    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await eventoService.getAllEventos();
                setEventos(response.data);  // Guardamos los eventos en el estado
            } catch (err) {
                setError('Error al obtener los eventos mágicos');
            }
        };

        fetchEventos();
    }, []);

    const handleEventoSelect = (id) => {
        setSelectedEventoId(id); // Guardar el evento seleccionado para auditar
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Panel de Administración</h2>
            <button style={styles.button} onClick={() => navigate('/')}>Ir a Home</button>

            <div style={styles.section}>
                <h3>Hechizos Disponibles</h3>
                <GestionarHechizos />
            </div>

            <div style={styles.section}>
                <h3>Eventos Mágicos</h3>
                {error && <p style={styles.error}>{error}</p>}
                <ul style={styles.eventList}>
                    {eventos.map((evento) => (
                        <li key={evento.id} onClick={() => handleEventoSelect(evento.id)} style={styles.eventItem}>
                            ID: {evento.id} - Descripción: {evento.descripcion}
                        </li>
                    ))}
                </ul>
            </div>

            <div style={styles.section}>
                <h3>Auditar Evento Mágico</h3>
                {selectedEventoId ? (
                    <AuditarEventoMagico eventoId={selectedEventoId} />
                ) : (
                    <p>Selecciona un evento mágico para auditar.</p>
                )}
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
    eventList: {
        listStyleType: 'none',
        paddingLeft: 0,
    },
    eventItem: {
        cursor: 'pointer',
        padding: '10px',
        margin: '5px 0',
        backgroundColor: '#f1f1f1',
        borderRadius: '5px',
    },
    error: {
        color: 'red',
    },
};
