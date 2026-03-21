// =============================================================================
// API DE AUTENTICACIÓN - api/auth/login.js
// =============================================================================
// Realiza la petición de login al backend para obtener el token JWT.

import { urlAPI } from '../../config/index.js';

/**
 * Autentica al usuario con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} - { success, token, tokenType, data: {usuario} }
 */
export const loginAPI = async (email, password) => {
    try {
        const response = await fetch(`${urlAPI}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Error al iniciar sesión. Código: ${response.status}`);
        }

        return data;

    } catch (error) {
        console.error(`Error en login: ${error.message}`);
        throw error;
    }
};
