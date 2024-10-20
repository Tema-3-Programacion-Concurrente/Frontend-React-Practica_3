import React, { useState, useEffect } from 'react';
import sistemaMagicoService from '../service/sistemaMagicoService';
import hechizoService from '../service/hechizoService';

export default function LanzarHechizo() {
    const [hechizos, setHechizos] = useState([]); // Lista de hechizos completos
    const [selectedHechizo, setSelectedHechizo] = useState(null); // Hechizo seleccionado
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        try {
            // Obtener usuario del localStorage
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

        // Verificar que se seleccionó un hechizo
        if (!selectedHechizo) {
            setError('Debes seleccionar un hechizo válido.');
            return;
        }

        try {
            // Crear el objeto con los datos del usuario y del hechizo seleccionado
            const usuarioData = {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido1: usuario.apellido1,
                apellido2: usuario.apellido2,
                correo: usuario.correo,
                telefono: usuario.telefono,
                direccion: usuario.direccion,
                poder: usuario.poder
            };

            console.log("Usuario:", usuarioData);
            console.log("Hechizo enviado:", selectedHechizo);

            // Enviar el usuario completo y el hechizo completo
            const response = await sistemaMagicoService.lanzarHechizo(usuarioData, selectedHechizo);
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
                    onChange={(e) => {
                        const hechizo = hechizos.find(h => h.id === parseInt(e.target.value));
                        setSelectedHechizo(hechizo); // Guardar el hechizo completo
                    }}
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
