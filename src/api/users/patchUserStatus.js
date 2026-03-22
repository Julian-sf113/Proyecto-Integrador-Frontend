import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Actualiza el estado de un usuario (admin)
 * @param {string} userId - El ID del usuario
 * @param {string} status - Nuevo estado (activo, inactivo, suspendido, eliminado)
 * @returns {Promise<Object>} - Datos del usuario actualizado
 */
export const patchUserStatus = async (userId, status) => {
    try {
        const response = await fetch(`${urlAPI}/api/users/${userId}/status`, {
            method: 'PATCH',
            headers: obtenerHeadersAuth(),
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Error al actualizar estado. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al actualizar estado del usuario: ${error.message}`);
        throw error;
    }
};
