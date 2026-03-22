import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Elimina un usuario del sistema (admin)
 * @param {string} userId - El ID del usuario
 * @returns {Promise<Object>} - Datos del usuario eliminado
 */
export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${urlAPI}/api/users/${userId}`, {
            method: 'DELETE',
            headers: obtenerHeadersAuth()
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar usuario. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al eliminar usuario: ${error.message}`);
        throw error;
    }
};
