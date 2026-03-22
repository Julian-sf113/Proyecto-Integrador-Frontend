import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Actualiza un usuario (admin)
 * @param {string} userId - El ID del usuario
 * @param {Object} userData - Campos a actualizar
 * @returns {Promise<Object>} - Datos del usuario actualizado
 */
export const updateUser = async (userId, userData) => {
    try {
        const response = await fetch(`${urlAPI}/api/users/${userId}`, {
            method: 'PUT',
            headers: obtenerHeadersAuth(),
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Error al actualizar usuario. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al actualizar usuario: ${error.message}`);
        throw error;
    }
};
