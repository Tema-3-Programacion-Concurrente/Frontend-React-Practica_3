import React from 'react';
import BiologicalDataManagement from '../../components/BiologicalDataManagement';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/authService";

function UserPage() {

    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };


    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Panel del Usuario</h1>

            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>

            <div style={styles.section}>
                <BiologicalDataManagement/>
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
        flexDirection: 'colum',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '40px',
    },
    title: {
        fontSize: '36px',
        color: '#ecf0f1',
        marginBottom:'30px',
        fontWeight:'bold',
        borderBottom: '2px solid #8e44ad',
        paddingBottom: '10px',
    },
    section: {
        width: '90%',
        maxWidth: '1200px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    logoutButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};


export default UserPage;
