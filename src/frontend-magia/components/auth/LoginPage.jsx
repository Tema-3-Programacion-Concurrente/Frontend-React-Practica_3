import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/authService';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await AuthService.login(email, password);
            const { token, role } = response;

            if (role) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);

                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/user');
                }
            } else {
                setError('Role not recognized');
            }
        } catch (err) {
            setError(err.message || 'Error during login');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Iniciar Sesión</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Iniciar Sesión
                    </button>
                </form>
                <p style={styles.text}>
                    ¿No tienes una cuenta?{' '}
                    <span style={styles.link} onClick={() => navigate('/register')}>
                        Regístrate
                    </span>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?magic,night")', // Fondo más mágico
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: '"Cinzel", serif', // Tipografía mágica
    },
    formContainer: {
        backgroundColor: 'rgba(26, 26, 29, 0.9)', // Fondo oscuro semitransparente
        padding: '40px 30px',
        borderRadius: '8px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.7)', // Sombra más oscura
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        border: '2px solid #B28D42', // Borde dorado para estilo mágico
    },
    title: {
        fontSize: '32px',
        marginBottom: '30px',
        color: '#F0E6D2', // Texto claro
        fontWeight: 'bold',
        letterSpacing: '2px', // Espaciado mágico
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '12px 15px',
        margin: '10px 0',
        border: '1px solid #B28D42', // Borde dorado
        borderRadius: '5px',
        fontSize: '16px',
        backgroundColor: '#333333', // Fondo oscuro para el input
        color: '#F0E6D2', // Texto claro
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    inputFocus: {
        borderColor: '#C59B5F', // Borde dorado claro al hacer focus
    },
    button: {
        padding: '15px',
        marginTop: '20px',
        backgroundColor: '#B28D42', // Color dorado en el botón
        color: '#1A1A1D', // Texto oscuro
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', // Sombra para el botón
    },
    buttonHover: {
        backgroundColor: '#C59B5F', // Efecto hover más claro
    },
    text: {
        marginTop: '20px',
        color: '#F0E6D2', // Texto claro
    },
    link: {
        color: '#B28D42', // Enlace dorado
        cursor: 'pointer',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: '5px',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
};

