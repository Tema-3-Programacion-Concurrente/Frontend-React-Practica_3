import React, { useState, useEffect } from 'react';
import seguridadService from '../../service/seguridadService';

export default function GestionarSeguridad() {
    const [seguridades, setSeguridades] = useState([]);
    const [newSeguridad, setNewSeguridad] = useState({ accion: '', autorizado: false });
    const [editSeguridad, setEditSeguridad] = useState(null);
    const [seguridadId, setSeguridadId] = useState('');
    const [singleSeguridad, setSingleSeguridad] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Obtener todas las seguridades al cargar el componente
    useEffect(() => {
        const fetchSeguridades = async () => {
            try {
                const response = await seguridadService.getAllSeguridades();
                setSeguridades(response.data);
            } catch (err) {
                setError('Error obteniendo los registros de seguridad.');
            }
        };

        fetchSeguridades();
    }, []);

    // Manejar el envío del formulario para crear una nueva seguridad
    const handleCreateSeguridad = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await seguridadService.createSeguridad(newSeguridad);
            setSeguridades([...seguridades, response.data]);
            setNewSeguridad({ accion: '', autorizado: false });
            setSuccess('Registro de seguridad creado exitosamente.');
        } catch (err) {
            setError('Error creando el registro de seguridad.');
        }
    };

    // Manejar el envío del formulario para editar una seguridad
    const handleEditSeguridad = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await seguridadService.updateSeguridad(editSeguridad.id, editSeguridad);
            const updatedSeguridades = seguridades.map((seguridad) =>
                seguridad.id === editSeguridad.id ? editSeguridad : seguridad
            );
            setSeguridades(updatedSeguridades);
            setEditSeguridad(null);
            setSuccess('Registro de seguridad actualizado exitosamente.');
        } catch (err) {
            setError('Error actualizando el registro de seguridad.');
        }
    };

    // Manejar la eliminación de un registro de seguridad
    const handleDeleteSeguridad = async (id) => {
        setError('');
        setSuccess('');

        try {
            await seguridadService.deleteSeguridad(id);
            setSeguridades(seguridades.filter((seguridad) => seguridad.id !== id));
            setSuccess('Registro de seguridad eliminado exitosamente.');
        } catch (err) {
            setError('Error eliminando el registro de seguridad.');
        }
    };

    // Manejar la búsqueda de una seguridad por su ID
    const handleGetSeguridadById = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await seguridadService.getSeguridadById(seguridadId);
            setSingleSeguridad(response.data);
            setSuccess('Registro de seguridad encontrado.');
        } catch (err) {
            setError('Error obteniendo el registro de seguridad.');
        }
    };

    return (
        <div>
            <h2>Gestionar Seguridad</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <h3>Crear Nueva Seguridad</h3>
            <form onSubmit={handleCreateSeguridad}>
                <input
                    type="text"
                    placeholder="Acción"
                    value={newSeguridad.accion}
                    onChange={(e) => setNewSeguridad({ ...newSeguridad, accion: e.target.value })}
                    required
                />
                <label>
                    Autorizado
                    <input
                        type="checkbox"
                        checked={newSeguridad.autorizado}
                        onChange={(e) => setNewSeguridad({ ...newSeguridad, autorizado: e.target.checked })}
                    />
                </label>
                <button type="submit">Crear Seguridad</button>
            </form>

            <h3>Buscar Seguridad por ID</h3>
            <form onSubmit={handleGetSeguridadById}>
                <input
                    type="text"
                    placeholder="ID de la Seguridad"
                    value={seguridadId}
                    onChange={(e) => setSeguridadId(e.target.value)}
                    required
                />
                <button type="submit">Buscar</button>
            </form>

            {singleSeguridad && (
                <div>
                    <h4>Resultado de la Búsqueda</h4>
                    <p>ID: {singleSeguridad.id}</p>
                    <p>Acción: {singleSeguridad.accion}</p>
                    <p>Autorizado: {singleSeguridad.autorizado ? 'Sí' : 'No'}</p>
                </div>
            )}

            <h3>Lista de Registros de Seguridad</h3>
            <ul>
                {seguridades.map((seguridad) => (
                    <li key={seguridad.id}>
                        {editSeguridad && editSeguridad.id === seguridad.id ? (
                            <form onSubmit={handleEditSeguridad}>
                                <input
                                    type="text"
                                    value={editSeguridad.accion}
                                    onChange={(e) => setEditSeguridad({ ...editSeguridad, accion: e.target.value })}
                                />
                                <label>
                                    Autorizado
                                    <input
                                        type="checkbox"
                                        checked={editSeguridad.autorizado}
                                        onChange={(e) => setEditSeguridad({ ...editSeguridad, autorizado: e.target.checked })}
                                    />
                                </label>
                                <button type="submit">Guardar Cambios</button>
                            </form>
                        ) : (
                            <>
                                Acción: {seguridad.accion} - Autorizado: {seguridad.autorizado ? 'Sí' : 'No'}{' '}
                                <button onClick={() => setEditSeguridad(seguridad)}>Editar</button>
                                <button onClick={() => handleDeleteSeguridad(seguridad.id)}>Eliminar</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
