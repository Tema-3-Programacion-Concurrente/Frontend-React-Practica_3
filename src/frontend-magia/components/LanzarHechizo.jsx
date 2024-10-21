import React, { useState, useEffect } from 'react';
import sistemaMagicoService from '../service/sistemaMagicoService';
import hechizoService from '../service/hechizoService';
import FireballAnimation from './FireballAnimation';
import WaterStreamAnimation from './WaterDropAnimation';
import AirGustAnimation from './AirGustAnimation'; // Importar la animación de la ráfaga de aire

export default function LanzarHechizo() {
    const [hechizos, setHechizos] = useState([]);
    const [selectedHechizo, setSelectedHechizo] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [isFireballLaunched, setIsFireballLaunched] = useState(false);
    const [isWaterStreamLaunched, setIsWaterStreamLaunched] = useState(false);
    const [isAirGustLaunched, setIsAirGustLaunched] = useState(false); // Estado para la ráfaga de aire

    useEffect(() => {
        try {
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
        setIsFireballLaunched(false);
        setIsWaterStreamLaunched(false);
        setIsAirGustLaunched(false); // Reiniciar todas las animaciones

        if (!usuario) {
            setError('Usuario no autenticado.');
            return;
        }
        if (!selectedHechizo) {
            setError('Debes seleccionar un hechizo válido.');
            return;
        }

        try {
            const updatedPoder = usuario.poder + 1;
            const usuarioData = {
                ...usuario,
                poder: updatedPoder,
            };
            const response = await sistemaMagicoService.lanzarHechizo(usuarioData, selectedHechizo);

            const updatedUser = { ...usuario, poder: updatedPoder };
            localStorage.setItem('usuario', JSON.stringify(updatedUser));
            setUsuario(updatedUser);

            setSuccess('Hechizo lanzado exitosamente.');

            // Verificar el tipo de hechizo seleccionado
            if (selectedHechizo.nombre.toLowerCase() === 'fuego') {
                setIsFireballLaunched(true); // Lanzar la bola de fuego
            } else if (selectedHechizo.nombre.toLowerCase() === 'agua') {
                setIsWaterStreamLaunched(true); // Lanzar el chorro de agua
            } else if (selectedHechizo.nombre.toLowerCase() === 'aire') {
                setIsAirGustLaunched(true); // Lanzar la ráfaga de aire
            }
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
                        <br />
                        Poder actual: {usuario.poder}
                    </p>
                )}

                <select
                    onChange={(e) => {
                        const hechizo = hechizos.find(h => h.id === parseInt(e.target.value));
                        setSelectedHechizo(hechizo);
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

            {/* Mostrar la animación según el tipo de hechizo */}
            {isFireballLaunched && <FireballAnimation />}
            {isWaterStreamLaunched && <WaterStreamAnimation />}
            {isAirGustLaunched && <AirGustAnimation />}
        </div>
    );
}
