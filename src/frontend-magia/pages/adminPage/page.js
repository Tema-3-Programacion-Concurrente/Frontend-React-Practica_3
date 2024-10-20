import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import LabManagement from '../../components/LabManagement';
import ResearcherManagement from '../../components/ResearcherManagement';
import ExperimentManagement from '../../components/ExperimentManagement';
import RegisterPage from '../../components/auth/RegisterPageAdmin'; // Página de registro

function AdminPage() {
    const [showRegisterForm, setShowRegisterForm] = useState(false); // Controla si se muestra el formulario
    const navigate = useNavigate(); // Inicializamos useNavigate

    const handleOpenRegisterForm = () => {
        setShowRegisterForm(true);
    };

    const handleCloseRegisterForm = () => {
        setShowRegisterForm(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/'); // Redirigimos al usuario a la página de inicio de sesión
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Panel de Administración</h1>

            {/* Contenedor de botones en la parte superior derecha */}
            <div style={styles.topRightButtons}>
                <button style={styles.registerButton} onClick={handleOpenRegisterForm}>
                    Registrar Cuenta [Administrador - Investigador]
                </button>
                <button style={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Modal para el formulario de registro */}
            {showRegisterForm && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <button style={styles.closeButton} onClick={handleCloseRegisterForm}>
                            X
                        </button>
                        <RegisterPage /> {/* Reutilizando el formulario de registro */}
                    </div>
                </div>
            )}

            <div style={styles.topSection}>
                <div style={styles.leftSection}>
                    <LabManagement />
                </div>
                <div style={styles.rightSection}>
                    <ResearcherManagement />
                </div>
            </div>
            <div style={styles.bottomSection}>
                <ExperimentManagement />
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#2c3e50',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#ecf0f1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        fontSize: '36px',
        color: '#ecf0f1',
        textAlign: 'center',
        marginBottom: '30px',
        fontWeight: 'bold',
        borderBottom: '2px solid #8e44ad',
        paddingBottom: '10px',
    },
    topRightButtons: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '10px',
    },
    registerButton: {
        padding: '10px 15px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    logoutButton: {
        padding: '10px 20px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '-60px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        marginRight: '40px'
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#2c3e50',
    },
    topSection: {
        display: 'flex',
        width: '90%',
        maxWidth: '1200px',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '40px',
    },
    leftSection: {
        flex: 1,
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    rightSection: {
        flex: 1,
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    bottomSection: {
        width: '90%',
        maxWidth: '1200px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default AdminPage;
