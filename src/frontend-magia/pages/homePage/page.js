import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    // Definimos los estilos en objetos JavaScript
    const styles = {
        homePage: {
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: 0,
        },
        navBar: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: '#EAF4FE',
            padding: '10px 20px',
        },
        loginButton: {
            backgroundColor: '#87CEEB',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        header: {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#BBDEFB',
            color: 'black',
        },
        image: {
            width: 'calc(100% - 40px)',
            height: 'auto',
            margin: '20px',
            borderRadius: '10px',
            maxHeight: '550px',
        },
        mainContent: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridGap: '20px',
            padding: '20px',
        },
        gridItem: {
            backgroundColor: '#BBDEFB',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        footer: {
            textAlign: 'center',
            padding: '10px',
            backgroundColor: '#EAF4FE',
            color: '#888',
            position: 'fixed',
            width: '100%',
            bottom: 0,
        },
    };

    return (
        <div style={styles.homePage}>
            {/* Barra de navegación */}
            <nav style={styles.navBar}>
                <Link to="/login" style={styles.loginButton}>
                    Iniciar Sesión
                </Link>
            </nav>

            {/* Encabezado */}
            <header style={styles.header}>
                <h1>Sistema de Análisis de Datos De Umbrella Corporation</h1>
            </header>

            {/* Imagen con altura ajustada */}
            <img
                src="https://vivaldigroup.com/wp-content/uploads/2023/04/healthcare-1920-x-640.jpg"
                alt="Procesamiento de Datos Biológicos"
                style={styles.image}
            />

            {/* Contenido principal con grid */}
            <main style={styles.mainContent}>
                {/* Contenedor 1 */}
                <div style={styles.gridItem}>
                    <h2>Procesamiento de Muestras</h2>
                    <p>
                        Ofrecemos soluciones avanzadas para el procesamiento de muestras físicas, biológicas y químicas.
                    </p>
                </div>
                {/* Contenedor 2 */}
                <div style={styles.gridItem}>
                    <h2>Análisis de Datos</h2>
                    <p>
                        Analiza y visualiza tus datos con nuestras herramientas intuitivas y fáciles de usar.
                    </p>
                </div>
                {/* Contenedor 3 */}
                <div style={styles.gridItem}>
                    <h2>Colaboración</h2>
                    <p>
                        Trabaja en conjunto con otros investigadores y comparte tus hallazgos fácilmente.
                    </p>
                </div>
                {/* Contenedor 4 */}
                <div style={styles.gridItem}>
                    <h2>Soporte Técnico</h2>
                    <p>
                        Nuestro equipo está disponible para ayudarte en cualquier momento.
                    </p>
                </div>
            </main>

            {/* Pie de página */}
            <footer style={styles.footer}>
                <p>© 2023 BioData Processing</p>
            </footer>
        </div>
    );
}

export default HomePage;