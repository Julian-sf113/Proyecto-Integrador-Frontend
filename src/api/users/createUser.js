import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Crea un nuevo usuario (admin)
 * @param {Object} userData - { firstName, lastName, email, password, status, role }
 * @returns {Promise<Object>} - Datos del usuario creado
 */
export const createUser = async (userData) => {
    try {
        const response = await fetch(`${urlAPI}/api/users`, {
            method: 'POST',
            headers: obtenerHeadersAuth(),
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Error al crear usuario. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al crear usuario: ${error.message}`);
        throw error;
    }
};
