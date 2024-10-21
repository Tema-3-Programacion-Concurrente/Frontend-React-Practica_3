import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LanzarHechizo from '../../components/LanzarHechizo'; // Importa el componente Lanzar Hechizo

export default function UserPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario está autenticado
        const storedUser = localStorage.getItem('usuario');
        if (!storedUser) {
            navigate('/login'); // Redirigir al login si no está autenticado
        }
    }, [navigate]);

    return (
        <div style={styles.pageContainer}>
            {/* Fondo del bosque en 8 bits */}
            <div style={{
                ...styles.bosque,
                backgroundImage: 'url("https://64.media.tumblr.com/60721f23d65f6f5cb82c07fefde68713/tumblr_n1dbbe4Ksd1rs0nhyo1_500.gif")'  // Reemplaza con la URL de tu imagen en Google
            }}></div>

            {/* Personaje en el centro */}
            <div style={{
                ...styles.personaje,
                backgroundImage: 'url("/wizardImage.png")',  // Utiliza la imagen importada
            }}></div>


            <div style={styles.leftSection}>
                <LanzarHechizo />
            </div>

            {/* Apartados verticales a la derecha */}
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
        backgroundColor: 'transparent !important', // Forzamos que sea transparente
        color: '#F0E6D2',
        fontFamily: '"Cinzel", serif',
        position: 'relative', // Necesario para la posición del fondo y el personaje
        overflowX: 'hidden', // Asegúrate de que no haya desplazamiento horizontal
    },
    bosque: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1, // Asegúrate de que esté detrás de todo
    },

    personaje: {
        position: 'fixed',
        top: '80%',  // Ajusta el valor para colocar el personaje justo sobre la hierba
        left: '50%',
        transform: 'translate(-50%, 0)',  // Mantenemos la horizontal centrada y eliminamos el ajuste vertical
        width: '100px',
        height: '100px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',  // Asegúrate de que el fondo sea transparente
        zIndex: 1,  // Por encima del fondo pero debajo de los hechizos
    },


    leftSection: {
        width: '35%',
        zIndex: 2, // Por encima del fondo y el personaje
    },
    rightSection: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90%',
        zIndex: 2, // Por encima del fondo y el personaje
    },
    magicSection: {
        backgroundColor: 'rgba(51, 51, 51, 0.7)', // Fondo semitransparente (70% opacidad)
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
