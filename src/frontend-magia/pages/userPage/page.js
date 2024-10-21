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
            {/* Componente de Lanzar Hechizo */}
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
        backgroundColor: '#1A1A1D',
        color: '#F0E6D2',
        fontFamily: '"Cinzel", serif',
    },
    leftSection: {
        width: '35%',
    },
    rightSection: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90%',
    },
    magicSection: {
        backgroundColor: '#333333',
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
