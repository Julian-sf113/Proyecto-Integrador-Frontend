// =============================================================================
// PROTECCIÓN DE RUTAS - auth/guard.js
// =============================================================================
// Funciones de guardia que verifican la autenticación y el rol del usuario
// antes de permitir el acceso a las diferentes vistas de la aplicación.

import { estaAutenticado, obtenerUsuario } from './tokenManager.js';

/**
 * Verifica que el usuario esté autenticado.
 * Si no lo está, redirige a la página de login.
 */
export function verificarAutenticacion() {
    if (!estaAutenticado()) {
        window.location.href = '/';
        return false;
    }
    return true;
}

/**
 * Verifica que el usuario autenticado tenga rol de administrador.
 * Si no es admin, redirige a la vista de usuario.
 */
export function verificarRolAdmin() {
    const usuario = obtenerUsuario();
    if (!usuario || usuario.role !== 'admin') {
        window.location.href = '/views/user/';
        return false;
    }
    return true;
}

/**
 * Si el usuario ya está autenticado, redirige a la vista correspondiente.
 * Se usa en la página de login para evitar que un usuario autenticado
 * vea el formulario de login nuevamente.
 */
export function redirigirSiAutenticado() {
    if (estaAutenticado()) {
        const usuario = obtenerUsuario();
        if (usuario && usuario.role === 'admin') {
            window.location.href = '/views/admin/';
        } else {
            window.location.href = '/views/user/';
        }
        return true;
    }
    return false;
}
