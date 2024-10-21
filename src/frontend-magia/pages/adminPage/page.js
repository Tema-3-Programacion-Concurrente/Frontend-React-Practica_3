import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GestionarHechizos from '../../components/GestionarHechizos';
import AuditarEventoMagico from '../../components/AuditarEventoMagico';
import eventoService from '../../service/eventoService';

export default function AdminPage() {
    const [eventos, setEventos] = useState([]);
    const [selectedEventoId, setSelectedEventoId] = useState('');
    const [error, setError] = useState('');
    const [currentGroup, setCurrentGroup] = useState(0); // Para controlar los contenedores de eventos
    const ITEMS_PER_GROUP = 9; // Número de eventos por grupo
    const navigate = useNavigate();

    // Obtener eventos mágicos al cargar la página
    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await eventoService.getAllEventos();
                setEventos(response.data);
            } catch (err) {
                setError('Error al obtener los eventos mágicos');
            }
        };

        fetchEventos();
    }, []);

    // Función para seleccionar un evento
    const handleEventoSelect = (id) => {
        setSelectedEventoId(id);
    };

    // Función para cambiar de grupo de eventos
    const handleNextGroup = () => {
        if ((currentGroup + 1) * ITEMS_PER_GROUP < eventos.length) {
            setCurrentGroup(currentGroup + 1);
        }
    };

    const handlePreviousGroup = () => {
        if (currentGroup > 0) {
            setCurrentGroup(currentGroup - 1);
        }
    };

    // Obtener el grupo actual de eventos
    const currentEventos = eventos.slice(currentGroup * ITEMS_PER_GROUP, (currentGroup + 1) * ITEMS_PER_GROUP);

    return (
        <div style={styles.container}>

            <div style={styles.leftSection}>
                <GestionarHechizos />
            </div>

            <div style={styles.rightSection}>
                <h3 style={styles.title}>Eventos Mágicos</h3>
                {error && <p style={styles.error}>{error}</p>}
                <ul style={styles.eventList}>
                    {currentEventos.map((evento) => (
                        <li key={evento.id} onClick={() => handleEventoSelect(evento.id)} style={styles.eventItem}>
                            ID: {evento.id} - Descripción: {evento.descripcion}
                        </li>
                    ))}
                </ul>

                {/* Botones de navegación para los eventos */}
                <div style={styles.navigationButtons}>
                    <button onClick={handlePreviousGroup} style={styles.navButton}>Anterior</button>
                    <button onClick={handleNextGroup} style={styles.navButton}>Siguiente</button>
                </div>

                {/* Auditar Evento Mágico debajo de los eventos */}
                <div style={styles.section}>
                    <h3 style={styles.title}>Auditar Evento Mágico</h3>
                    {selectedEventoId ? (
                        <AuditarEventoMagico eventoId={selectedEventoId} />
                    ) : (
                        <p>Selecciona un evento mágico para auditar.</p>
                    )}
                </div>
            </div>

        </div>
    );
}
// Estilos en línea
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#E0E0E0',  // Asegurar que el texto sea visible
    },
    leftSection: {
        width: '40%',
    },
    rightSection: {
        width: '50%',
        paddingLeft: '20px',
    },
    eventList: {
        listStyleType: 'none',
        paddingLeft: 0,
    },
    eventItem: {
        cursor: 'pointer',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: '#333333',  // Fondo oscuro para el evento
        borderRadius: '5px',
        border: '1px solid #B28D42',  // Borde dorado como en la imagen
        color: '#E0E0E0',  // Texto claro
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',  // Sombras para darle profundidad
        transition: 'transform 0.3s, box-shadow 0.3s',  // Suavizar la transición al hacer hover
    },
    eventItemHover: {
        transform: 'scale(1.02)',  // Aumentar ligeramente el tamaño al hacer hover
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',  // Sombras más intensas en hover
    },
    error: {
        color: 'red',
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    navButton: {
        padding: '10px',
        backgroundColor: '#B28D42',  // Color marrón claro
        color: '#1A1A1D',  // Texto oscuro
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',  // Sombras en los botones
        transition: 'background-color 0.3s ease',
    },
    navButtonHover: {
        backgroundColor: '#C59B5F',  // Cambiar a tono más claro en hover
    },
    section: {
        marginTop: '20px',
    },
    // Estilo para los títulos como "Crear Nuevo Hechizo"
    sectionTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#B28D42',  // Texto dorado
        marginBottom: '10px',
        textTransform: 'uppercase',
    },
    inputField: {
        width: '100%',
        padding: '10px',
        border: '1px solid #B28D42',  // Borde dorado
        borderRadius: '5px',
        backgroundColor: '#333333',  // Fondo oscuro
        color: '#E0E0E0',  // Texto claro
        marginBottom: '15px',
    },
    button: {
        padding: '12px',
        backgroundColor: '#B28D42',
        color: '#1A1A1D',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#C59B5F',  // Cambia a tono más claro
    },
};
