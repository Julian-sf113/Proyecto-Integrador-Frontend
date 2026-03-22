// =============================================================================
// GESTIÓN DE TOKEN Y SESIÓN - auth/tokenManager.js
// =============================================================================
// Maneja el almacenamiento y recuperación del token JWT y datos de usuario
// en localStorage para mantener la sesión entre recargas de página.

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Guarda el token y datos del usuario en localStorage
 */
export function guardarSesion(token, usuario) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

/**
 * Obtiene el token JWT almacenado
 */
export function obtenerToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Obtiene los datos del usuario almacenado
 */
export function obtenerUsuario() {
    const datos = localStorage.getItem(USER_KEY);
    if (!datos) return null;
    try {
        return JSON.parse(datos);
    } catch {
        return null;
    }
}

/**
 * Cierra la sesión eliminando token y usuario, redirige al login
 */
export function cerrarSesion() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = '/';
}

/**
 * Retorna los headers de autorización para las peticiones fetch
 */
export function obtenerHeadersAuth() {
    const token = obtenerToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

/**
 * Verifica si hay una sesión activa
 */
export function estaAutenticado() {
    return obtenerToken() !== null && obtenerUsuario() !== null;
}
