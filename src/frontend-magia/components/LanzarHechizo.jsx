import React, { useState, useEffect } from 'react';
import sistemaMagicoService from '../service/sistemaMagicoService';
import hechizoService from '../service/hechizoService';
import FireballAnimation from './FireballAnimation';
import WaterStreamAnimation from './WaterDropAnimation';
import AirGustAnimation from './AirGustAnimation';
import RockExplosionAnimation from './RockExplosionAnimation'; // Importar la animación de la roca

export default function LanzarHechizo() {
    const [hechizos, setHechizos] = useState([]);
    const [selectedHechizo, setSelectedHechizo] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [isFireballLaunched, setIsFireballLaunched] = useState(false);
    const [isWaterStreamLaunched, setIsWaterStreamLaunched] = useState(false);
    const [isAirGustLaunched, setIsAirGustLaunched] = useState(false);
    const [isRockExplosionLaunched, setIsRockExplosionLaunched] = useState(false); // Estado para la roca

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
        setIsAirGustLaunched(false);
        setIsRockExplosionLaunched(false); // Reiniciar todas las animaciones

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
            } else if (selectedHechizo.nombre.toLowerCase() === 'roca') {
                setIsRockExplosionLaunched(true); // Lanzar la explosión de roca
            }
        } catch (err) {
            setError('Error lanzando el hechizo: ' + (err.response?.data || err.message));
        }
    };

    // Estilos CSS en línea para la estética del Ministerio de Magia
    const styles = {
        container: {
            backgroundColor: '#1A1A1D', // Fondo oscuro elegante
            color: '#F0E6D2', // Color claro para texto
            padding: '20px',
            width: '300px', // Anchura para alinearlo a la izquierda
            position: 'fixed', // Posición fija en la izquierda
            left: '20px',
            top: '50px', // Separación desde la parte superior
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            fontFamily: '"Cinzel", serif', // Fuente con estilo clásico y mágico
            border: '2px solid #B28D42',
        },
        header: {
            textAlign: 'center',
            fontSize: '28px',
            marginBottom: '20px',
            letterSpacing: '2px',
            color: '#B28D42', // Toques dorados
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        select: {
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #B28D42',
            backgroundColor: '#333333',
            color: '#F0E6D2',
            transition: 'all 0.3s',
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
        buttonHover: {
            backgroundColor: '#C59B5F',
        },
        userInfo: {
            fontSize: '16px',
            lineHeight: '1.6',
            textAlign: 'center',
        },
        successMessage: {
            color: 'green',
            textAlign: 'center',
        },
        errorMessage: {
            color: 'red',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Lanzar Hechizo</h2>
            {error && <p style={styles.errorMessage}>{error}</p>}
            {success && <p style={styles.successMessage}>{success}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                {usuario && (
                    <p style={styles.userInfo}>
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
                    style={styles.select}
                    required
                >
                    <option value="">Seleccione un hechizo</option>
                    {hechizos.map((hechizo) => (
                        <option key={hechizo.id} value={hechizo.id}>
                            {hechizo.nombre} - Poder: {hechizo.poder}
                        </option>
                    ))}
                </select>

                <button type="submit" style={styles.button}>
                    Lanzar Hechizo
                </button>
            </form>

            {/* Mostrar la animación según el tipo de hechizo */}
            {isFireballLaunched && <FireballAnimation />}
            {isWaterStreamLaunched && <WaterStreamAnimation />}
            {isAirGustLaunched && <AirGustAnimation />}
            {isRockExplosionLaunched && <RockExplosionAnimation />} {/* Mostrar la animación de la roca */}
        </div>
    );
}
