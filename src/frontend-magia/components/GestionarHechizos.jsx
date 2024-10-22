import React, { useState, useEffect } from 'react';
import hechizoService from '../service/hechizoService';

export default function GestionarHechizos() {
    const [hechizos, setHechizos] = useState([]);
    const [newHechizo, setNewHechizo] = useState({ nombre: '', poder: 0, tipo: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentGroup, setCurrentGroup] = useState(0); // Estado para controlar el grupo de hechizos mostrado
    const ITEMS_PER_GROUP = 4; // Número de hechizos por grupo

    useEffect(() => {
        const fetchHechizos = async () => {
            try {
                const response = await hechizoService.getAllHechizos();
                setHechizos(response.data);
            } catch (err) {
                setError('Error obteniendo los hechizos.');
            }
        };

        fetchHechizos();
    }, []);

    const handleCreateHechizo = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await hechizoService.createHechizo(newHechizo);
            setHechizos([...hechizos, response.data]);
            setNewHechizo({ nombre: '', poder: 0, tipo: '' });
            setSuccess('Hechizo creado exitosamente.');
        } catch (err) {
            setError('Error creando el hechizo.');
        }
    };

    // Función para cambiar de grupo de hechizos
    const handleNextGroup = () => {
        if ((currentGroup + 1) * ITEMS_PER_GROUP < hechizos.length) {
            setCurrentGroup(currentGroup + 1);
        }
    };

    const handlePreviousGroup = () => {
        if (currentGroup > 0) {
            setCurrentGroup(currentGroup - 1);
        }
    };

    // Obtener el grupo actual de hechizos
    const currentHechizos = hechizos.slice(currentGroup * ITEMS_PER_GROUP, (currentGroup + 1) * ITEMS_PER_GROUP);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Gestionar Hechizos</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}

            <h3 style={styles.subheader}>Crear Nuevo Hechizo</h3>
            <form style={styles.form} onSubmit={handleCreateHechizo}>
                <input
                    type="text"
                    placeholder="Nombre del Hechizo"
                    value={newHechizo.nombre}
                    onChange={(e) => setNewHechizo({ ...newHechizo, nombre: e.target.value })}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Poder del Hechizo"
                    value={newHechizo.poder}
                    onChange={(e) => setNewHechizo({ ...newHechizo, poder: parseInt(e.target.value) })}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Tipo de Hechizo (fuego, agua, aire, roca, electro)"
                    value={newHechizo.tipo}
                    onChange={(e) => setNewHechizo({ ...newHechizo, tipo: e.target.value })}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Crear Hechizo</button>
            </form>

            <h3 style={styles.subheader}>Lista de Hechizos</h3>
            <div>
                {/* Grupo de hechizos */}
                <div style={styles.hechizoGroup}>
                    {currentHechizos.map((hechizo) => (
                        <div key={hechizo.id} style={styles.hechizoItem}>
                            <p>
                                Nombre: {hechizo.nombre} - Poder: {hechizo.poder} - ID: {hechizo.id}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Botones de navegación */}
                <div style={styles.navigationButtons}>
                    <button onClick={handlePreviousGroup} style={styles.button}>Anterior</button>
                    <button onClick={handleNextGroup} style={styles.button}>Siguiente</button>
                </div>
            </div>

            {/* Estilos CSS en línea */}
            <style>
                {styles.scrollStyles}
            </style>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#1A1A1D',
        color: '#F0E6D2',
        padding: '15px 20px',
        width: '600px',
        position: 'fixed',
        left: '20px',
        top: '50px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
        fontFamily: '"Cinzel", serif',
        border: '2px solid #B28D42',
        height: '80%',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
    },
    scrollStyles: `
        ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
        }
    `,
    header: {
        textAlign: 'center',
        fontSize: '28px',
        marginBottom: '15px',
        letterSpacing: '2px',
        color: '#B28D42',
        borderBottom: '2px solid #B28D42',
        paddingBottom: '10px',
    },
    subheader: {
        fontSize: '20px',
        marginTop: '15px',
        color: '#B28D42',
    },
    form: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #B28D42',
        backgroundColor: '#333333',
        color: '#F0E6D2',
        width: '100%',
        boxSizing: 'border-box',
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
    hechizoGroup: {
        marginBottom: '15px',
    },
    hechizoItem: {
        padding: '15px',
        backgroundColor: '#333333',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        marginBottom: '10px',
        border: '1px solid #B28D42',
        color: '#F0E6D2',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    },
    success: {
        color: 'green',
        fontWeight: 'bold',
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
};
