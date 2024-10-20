import React, { useState, useEffect } from 'react';
import sistemaMagicoService from '../service/sistemaMagicoService';
import hechizoService from '../service/hechizoService';

export default function LanzarHechizo() {
    const [hechizos, setHechizos] = useState([]);
    const [selectedHechizo, setSelectedHechizo] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        try {
            // Obtener usuario del localStorage y verificar que no sea null o undefined
            const storedUser = localStorage.getItem('usuario');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUsuario(parsedUser);
            } else {
                setError('Usuario no autenticado');
            }
        } catch (err) {
            setError('Error al obtener el usuario del almacenamiento local.');
        }

        // Obtener la lista de hechizos disponibles
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!usuario) {
            setError('Usuario no autenticado.');
            return;
        }

        const hechizoSeleccionado = hechizos.find(h => h.id === selectedHechizo);

        if (!hechizoSeleccionado) {
            setError('Debes seleccionar un hechizo válido.');
            return;
        }

        try {
            // Información completa del usuario a enviar
            const usuarioData = {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido1: usuario.apellido1,
                apellido2: usuario.apellido2,
                correo: usuario.correo,
                contrasena: usuario.contrasena, // Asegúrate de que esté en tu backend si es necesario
                telefono: usuario.telefono,
                direccion: usuario.direccion,
                poder: usuario.poder
            };

            const response = await sistemaMagicoService.lanzarHechizo(usuarioData, hechizoSeleccionado);
            setSuccess('Hechizo lanzado exitosamente.');
        } catch (err) {
            setError('Error lanzando el hechizo: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div>
            <h2>Lanzar Hechizo</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                {usuario && (
                    <p>
                        Usuario: {usuario.nombre} {usuario.apellido1} {usuario.apellido2}
                    </p>
                )}

                <select
                    value={selectedHechizo}
                    onChange={(e) => setSelectedHechizo(e.target.value)}
                    required
                >
                    <option value="">Seleccione un hechizo</option>
                    {hechizos.map((hechizo) => (
                        <option key={hechizo.id} value={hechizo.id}>
                            {hechizo.nombre} - Poder: {hechizo.poder}
                        </option>
                    ))}
                </select>

                <button type="submit">Lanzar Hechizo</button>
            </form>
        </div>
    );
}
