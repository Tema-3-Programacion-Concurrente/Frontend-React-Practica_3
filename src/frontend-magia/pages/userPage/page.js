import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanzarHechizo from '../../components/LanzarHechizo'; // Importa el componente Lanzar Hechizo

export default function UserPage() {
    const navigate = useNavigate();
    const [personajeTop, setPersonajeTop] = useState('80%');  // Inicia con el 80% de la altura de la ventana
    const [vida, setVida] = useState(200);  // Vida inicial del personaje
    const [isVisible, setIsVisible] = useState(true);  // Controla si el personaje es visible
    const [isHit, setIsHit] = useState(false);  // Controla si el personaje está siendo golpeado
    const [isDying, setIsDying] = useState(false); // Controla el estado de "muriendo"

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (!storedUser) {
            navigate('/login'); // Redirigir al login si no está autenticado
        }

        const recalculatePosition = () => {
            const windowHeight = window.innerHeight;
            const characterTop = windowHeight * 0.80;
            setPersonajeTop(`${characterTop}px`);
        };

        recalculatePosition();
        window.addEventListener('resize', recalculatePosition);

        return () => {
            window.removeEventListener('resize', recalculatePosition);
        };
    }, [navigate]);

    const recibirHechizo = (danio) => {
        setTimeout(() => {
            if (vida - danio <= 0) {
                setVida(0);
                morirPersonaje(); // Inicia la animación de muerte
            } else {
                setVida(vida - danio);
                setIsHit(true);
                setTimeout(() => setIsHit(false), 200); // Después de 200ms deja de parpadear
            }
        }, 1500);  // Ajuste de tiempo (1.5 segundos) para simular el impacto después de la explosión
    };

    const morirPersonaje = () => {
        setIsDying(true);
        setTimeout(() => {
            setIsDying(false); // Detener el parpadeo rojo
            setIsVisible(false); // Desvanecer al personaje
            setTimeout(() => {
                setVida(200);  // Restablece la vida a 200
                setIsVisible(true);  // Hace reaparecer al personaje después de 2 segundos
            }, 2000);
        }, 1500); // Tiempo de parpadeo rojo antes de desvanecerse completamente
    };

    return (
        <div style={styles.pageContainer}>
            {/* Fondo del bosque en 8 bits */}
            <div style={{
                ...styles.bosque,
                backgroundImage: 'url("https://64.media.tumblr.com/60721f23d65f6f5cb82c07fefde68713/tumblr_n1dbbe4Ksd1rs0nhyo1_500.gif")'
            }}></div>

            {/* Barra de vida sobre el personaje */}
            {isVisible && (
                <div style={styles.vidaBarContainer}>
                    <div style={{ ...styles.vidaBar, width: `${(vida / 200) * 100}%` }}></div>
                </div>
            )}

            {/* Personaje en el centro */}
            {isVisible && (
                <div style={{
                    ...styles.personaje,
                    top: personajeTop,
                    backgroundImage: 'url("/wizardImage.png")',
                    opacity: isDying ? 1 : (isHit ? 0.5 : 1), // Parpadeo al ser golpeado o muriendo
                    backgroundColor: isHit ? 'rgba(255, 0, 0, 0.5)' : 'transparent', // Parpadeo rojo al ser golpeado
                    borderRadius: '50%', // Convierte el parpadeo en un círculo al parpadear
                    boxShadow: isHit ? '0 0 20px 10px rgba(255, 0, 0, 0.5)' : 'none', // Efecto circular solo cuando es golpeado
                    transition: isDying ? 'opacity 1.5s ease-out' : 'background-color 0.2s ease, opacity 0.2s ease', // Desvanecimiento suave cuando muere
                }}></div>
            )}

            <div style={styles.leftSection}>
                <LanzarHechizo onHechizoLanzado={recibirHechizo} /> {/* Pasamos la función para recibir el daño */}
            </div>

            <div style={styles.rightSection}>
                <div style={styles.magicSection}>
                    <h4 style={styles.sectionTitle}>Pociones</h4>
                    <p style={styles.sectionDescription}>Crea poderosas pociones mágicas para aumentar tu poder y resistencia en batalla.</p>
                </div>
                <div style={styles.magicSection}>
                    <h4 style={styles.sectionTitle}>Invocaciones</h4>
                    <p style={styles.sectionDescription}>Domina el arte de invocar criaturas mágicas que te acompañarán en tus misiones.</p>
                </div>
                <div style={styles.magicSection}>
                    <h4 style={styles.sectionTitle}>Cristales Mágicos</h4>
                    <p style={styles.sectionDescription}>Utiliza cristales encantados para potenciar tus hechizos y amplificar tu magia.</p>
                </div>
                <div style={styles.magicSection}>
                    <h4 style={styles.sectionTitle}>Alquimia</h4>
                    <p style={styles.sectionDescription}>Transforma y transfigura elementos para crear nuevas sustancias mágicas.</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        height: '100vh',
        backgroundColor: 'transparent !important',
        color: '#F0E6D2',
        fontFamily: '"Cinzel", serif',
        position: 'relative',
        overflowX: 'hidden',
    },
    bosque: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1,
    },
    personaje: {
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '100px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
    },
    vidaBarContainer: {
        position: 'fixed', // Fijamos la barra para que se mantenga sobre el personaje
        left: '50%',
        transform: 'translateX(-50%)',
        top: '78%', // Ajustado para estar un poco más abajo del personaje
        width: '120px',
        height: '10px',
        backgroundColor: '#555', // Fondo de la barra
        borderRadius: '5px',
        overflow: 'hidden',
        zIndex: 2,
    },
    vidaBar: {
        height: '100%',
        backgroundColor: '#00FF00', // Color verde de la barra de vida
        transition: 'width 0.5s ease', // Efecto de transición
    },
    leftSection: {
        width: '35%',
        zIndex: 2,
    },
    rightSection: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90%',
        zIndex: 2,
    },
    magicSection: {
        backgroundColor: 'rgba(51, 51, 51, 0.7)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
        border: '2px solid #B28D42',
        textAlign: 'center',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#B28D42',
        marginBottom: '10px',
    },
    sectionDescription: {
        fontSize: '16px',
        color: '#F0E6D2',
    },
};
