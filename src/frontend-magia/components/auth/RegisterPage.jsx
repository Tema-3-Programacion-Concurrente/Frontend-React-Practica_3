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
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?abstract")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    formWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
    },
    title: {
        fontSize: '30px',
        marginBottom: '25px',
        color: '#2c3e50',
        fontWeight: 'bold',
    },
    input: {
        marginBottom: '15px',
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    inputFocus: {
        borderColor: '#3498db',
    },
    button: {
        padding: '12px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#2980b9',
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
        color: '#2c3e50',
    },
    link: {
        color: '#3498db',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
};
