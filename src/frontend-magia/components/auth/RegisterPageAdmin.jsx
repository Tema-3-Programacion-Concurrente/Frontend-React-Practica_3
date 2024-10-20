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
    const [role, setRole] = useState('admin');
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
        } catch (err) {
            setError('Error durante el registro. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Registrar Cuenta</h2>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}
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
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'transparent',
    },

    form: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        height: 'auto', // Ajustar la altura al contenido
        maxHeight: '90vh', // Limitar la altura máxima para evitar el desbordamiento
        overflowY: 'auto', // Añadir barra de desplazamiento si es necesario
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#2c3e50',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        textAlign: 'center',
        marginBottom: '10px',
    },
};