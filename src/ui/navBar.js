// =============================================================================
// COMPONENTE NAVBAR - ui/navBar.js
// =============================================================================
// Crea la barra de navegación superior con información del usuario y logout.

import { cerrarSesion } from '../auth/tokenManager.js';

/**
 * Inicializa la navbar con el nombre del usuario y el botón de logout
 * @param {Object} usuario - Datos del usuario autenticado
 */
export function inicializarNavbar(usuario) {
    const nombreUsuario = document.querySelector('#navUserName');
    const rolUsuario = document.querySelector('#navUserRole');
    const btnLogout = document.querySelector('#btnLogout');

    if (nombreUsuario) {
        nombreUsuario.textContent = `${usuario.firstName} ${usuario.lastName}`;
    }

    if (rolUsuario) {
        rolUsuario.textContent = usuario.role === 'admin' ? 'Administrador' : 'Usuario';
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            cerrarSesion();
        });
    }
}
