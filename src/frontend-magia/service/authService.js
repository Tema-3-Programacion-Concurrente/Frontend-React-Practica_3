const API_BASE_URL = 'http://localhost:8080/api'; // Ajusta la URL según tu API

// Servicio de login
export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo: email, contrasena: password }),
        });

        if (!response.ok) {
            throw new Error('Error during login');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role); // Guardar el rol del usuario

        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

// Servicio de registro
export async function register(user) {
    try {
        // Enviar el rol como parámetro de consulta en la URL
        const response = await fetch(`${API_BASE_URL}/auth/register?rol=${user.role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: user.nombre,
                apellido1: user.apellido1,
                apellido2: user.apellido2,
                correo: user.correo,
                contrasena: user.contrasena,
                telefono: user.telefono,
                direccion: user.direccion,
                poder: user.poder,
            }),
        });

        if (!response.ok) {
            throw new Error('Error during registration');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}


// Servicio de logout
export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
}

// Obtener el rol del usuario actual
export function getCurrentUserRole() {
    return localStorage.getItem('role');
}

// Comprobar si el usuario está autenticado
export function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

export default {
    login,
    register,
    logout,
    getCurrentUserRole,
    isAuthenticated,
};