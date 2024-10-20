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
        <BrowserRouter>
            <Routes>
                {/* Ruta para el panel del administrador */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />

                {/* Ruta para el panel del usuario */}
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
        </BrowserRouter>
    );
}

export default App;
