import React, { useState, useEffect } from 'react';
import hechizoService from '../service/hechizoService';

export default function GestionarHechizos() {
    const [hechizos, setHechizos] = useState([]);
    const [newHechizo, setNewHechizo] = useState({ nombre: '', poder: 0, tipo: '' });
    const [editHechizo, setEditHechizo] = useState(null);
    const [hechizoId, setHechizoId] = useState('');
    const [singleHechizo, setSingleHechizo] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Obtener todos los hechizos al cargar el componente
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

    // Manejar el envío del formulario para crear un nuevo hechizo
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

    // Manejar el envío del formulario para editar un hechizo
    const handleEditHechizo = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await hechizoService.updateHechizo(editHechizo.id, editHechizo);
            const updatedHechizos = hechizos.map((hechizo) =>
                hechizo.id === editHechizo.id ? editHechizo : hechizo
            );
            setHechizos(updatedHechizos);
            setEditHechizo(null);
            setSuccess('Hechizo actualizado exitosamente.');
        } catch (err) {
            setError('Error actualizando el hechizo.');
        }
    };

    // Manejar la eliminación de un hechizo
    const handleDeleteHechizo = async (id) => {
        setError('');
        setSuccess('');

        try {
            await hechizoService.deleteHechizo(id);
            setHechizos(hechizos.filter((hechizo) => hechizo.id !== id));
            setSuccess('Hechizo eliminado exitosamente.');
        } catch (err) {
            setError('Error eliminando el hechizo.');
        }
    };

    // Manejar la búsqueda de un hechizo por su ID
    const handleGetHechizoById = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await hechizoService.getHechizoById(hechizoId);
            setSingleHechizo(response.data);
            setSuccess('Hechizo encontrado.');
        } catch (err) {
            setError('Error obteniendo el hechizo.');
        }
    };

    return (
        <div>
            <h2>Gestionar Hechizos</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <h3>Crear Nuevo Hechizo</h3>
            <form onSubmit={handleCreateHechizo}>
                <input
                    type="text"
                    placeholder="Nombre del Hechizo"
                    value={newHechizo.nombre}
                    onChange={(e) => setNewHechizo({ ...newHechizo, nombre: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Poder del Hechizo"
                    value={newHechizo.poder}
                    onChange={(e) => setNewHechizo({ ...newHechizo, poder: parseInt(e.target.value) })}
                    required
                />
                <input
                    type="text"
                    placeholder="Tipo de Hechizo (fuego, agua, aire, roca)"
                    value={newHechizo.tipo}
                    onChange={(e) => setNewHechizo({ ...newHechizo, tipo: e.target.value })}
                    required
                />
                <button type="submit">Crear Hechizo</button>
            </form>

            <h3>Buscar Hechizo por ID</h3>
            <form onSubmit={handleGetHechizoById}>
                <input
                    type="text"
                    placeholder="ID del Hechizo"
                    value={hechizoId}
                    onChange={(e) => setHechizoId(e.target.value)}
                    required
                />
                <button type="submit">Buscar</button>
            </form>

            {singleHechizo && (
                <div>
                    <h4>Resultado de la Búsqueda</h4>
                    <p>ID: {singleHechizo.id}</p>
                    <p>Nombre: {singleHechizo.nombre}</p>
                    <p>Poder: {singleHechizo.poder}</p>
                    <p>Tipo: {singleHechizo.tipo}</p>
                </div>
            )}

            <h3>Lista de Hechizos</h3>
            <ul>
                {hechizos.map((hechizo) => (
                    <li key={hechizo.id}>
                        {editHechizo && editHechizo.id === hechizo.id ? (
                            <form onSubmit={handleEditHechizo}>
                                <input
                                    type="text"
                                    value={editHechizo.nombre}
                                    onChange={(e) => setEditHechizo({ ...editHechizo, nombre: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editHechizo.poder}
                                    onChange={(e) => setEditHechizo({ ...editHechizo, poder: parseInt(e.target.value) })}
                                />
                                <input
                                    type="text"
                                    value={editHechizo.tipo}
                                    onChange={(e) => setEditHechizo({ ...editHechizo, tipo: e.target.value })}
                                />
                                <button type="submit">Guardar Cambios</button>
                            </form>
                        ) : (
                            <>
                                Nombre: {hechizo.nombre} - Poder: {hechizo.poder} - Tipo: {hechizo.tipo}{' '}
                                <button onClick={() => setEditHechizo(hechizo)}>Editar</button>
                                <button onClick={() => handleDeleteHechizo(hechizo.id)}>Eliminar</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

