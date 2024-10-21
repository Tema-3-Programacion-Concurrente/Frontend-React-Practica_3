// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AdminPage from '../frontend-magia/pages/adminPage/page';
import UserPage from './pages/userPage/page';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import AuthService from './service/authService';
import HomePage from './pages/homePage/page';

function ProtectedRoute({ roleRequired, children }) {
    const role = AuthService.getCurrentUserRole();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!AuthService.isAuthenticated() || role !== roleRequired) {
            navigate('/login');
        }
    }, [role, roleRequired, navigate]);

    return children;
}

function App() {
    return (
        <div style={styles.body}>
            <BrowserRouter>
                <Routes>
                    {/* Ruta protegida para el panel del administrador */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute roleRequired="admin">
                                <AdminPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Ruta protegida para el panel del usuario */}
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute roleRequired="user">
                                <UserPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Ruta de login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Ruta de registro */}
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Ruta por defecto muestra la página de inicio */}
                    <Route path="/" element={<HomePage />} />
                </Routes>

                {/* Footer añadido */}
                <footer style={styles.footer}>
                    <p>Sistema Mágico © 2024</p>
                </footer>
            </BrowserRouter>
        </div>
    );
}

// Estilos en línea
const styles = {
    body: {
        backgroundColor: '#1A1A1D', // Cambiar color de fondo
        color: '#F0E6D2', // Color del texto
        minHeight: '100vh', // Altura mínima
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 0,  // Asegurarse de eliminar cualquier margen del body
        overflowX: 'hidden', // Evitar cualquier desplazamiento horizontal
    },
    footer: {
        backgroundColor: '#1A1A1D',
        color: '#F0E6D2',
        textAlign: 'center',
        padding: '15px 20px',
        borderTop: '2px solid #B28D42',
        width: '100vw', // Asegurarse de que el footer ocupe el ancho completo de la pantalla
        boxSizing: 'border-box', // Asegurarse de que el padding no cause desbordamiento
        position: 'relative',
        bottom: 0,
        left: 0,  // Asegurar que esté alineado a la izquierda
    },
};

export default App;
