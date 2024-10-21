import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/authService';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [lastName1, setLastName1] = useState('');
    const [lastName2, setLastName2] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Validaciones de campos vacíos
        if (!name || !lastName1 || !email || !password || !phone || !address) {
            setError('Por favor complete todos los campos.');
            setLoading(false);
            return;
        }

        try {
            await AuthService.register({
                nombre: name,
                apellido1: lastName1,
                apellido2: lastName2,
                correo: email,
                contrasena: password,
                telefono: phone,
                direccion: address,
                role,
            });
            setSuccess('Usuario registrado con éxito');
            navigate('/login'); // Redirige al login después de un registro exitoso
        } catch (err) {
            setError('Error durante el registro. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Registrar Cuenta</h2>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}

                <form style={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Primer Apellido"
                        value={lastName1}
                        onChange={(e) => setLastName1(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Segundo Apellido"
                        value={lastName2}
                        onChange={(e) => setLastName2(e.target.value)}
                        style={styles.input}
                    />
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
                    <input
                        type="text"
                        placeholder="Teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Dirección"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input} required>
                        <option value="user">Usuario</option>
                    </select>

                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrar'}
                    </button>

                    <p style={styles.loginLink}>
                        ¿Ya tienes una cuenta?{' '}
                        <a href="/login" style={styles.link}>Iniciar sesión</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?magic,dark")', // Imagen mágica de fondo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: '"Cinzel", serif', // Fuente similar a los estilos mágicos anteriores
    },
    formWrapper: {
        backgroundColor: 'rgba(26, 26, 29, 0.9)', // Fondo oscuro con transparencia
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.7)', // Sombra más oscura
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        border: '2px solid #B28D42', // Borde dorado para darle un toque mágico
    },
    title: {
        fontSize: '30px',
        marginBottom: '25px',
        color: '#F0E6D2', // Color claro similar al tema anterior
        fontWeight: 'bold',
        letterSpacing: '2px', // Espaciado para darle un toque elegante
    },
    input: {
        marginBottom: '15px',
        padding: '12px',
        border: '1px solid #B28D42', // Borde dorado para los campos de texto
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%',
        backgroundColor: '#333333', // Fondo oscuro para el input
        color: '#F0E6D2', // Texto claro
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    inputFocus: {
        borderColor: '#C59B5F', // Borde dorado más claro al hacer focus
    },
    button: {
        padding: '12px',
        backgroundColor: '#B28D42', // Color dorado en los botones
        color: '#1A1A1D', // Texto oscuro
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%',
        transition: 'background-color 0.3s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', // Sombra más suave
    },
    buttonHover: {
        backgroundColor: '#C59B5F', // Efecto hover con color dorado más claro
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
    success: {
        color: 'green',
        marginBottom: '15px',
    },
    loginLink: {
        marginTop: '20px',
        color: '#F0E6D2', // Texto claro
    },
    link: {
        color: '#B28D42', // Enlaces dorados
        cursor: 'pointer',
        textDecoration: 'underline',
    },
};

