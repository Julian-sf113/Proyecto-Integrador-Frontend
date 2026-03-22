import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Remueve un usuario de una tarea
 * @param {string} taskId - El ID de la tarea
 * @param {string} userId - El ID del usuario a remover
 * @returns {Promise<Object>} - Datos de la tarea actualizada
 */
export const removeUserFromTask = async (taskId, userId) => {
    try {
        const response = await fetch(`${urlAPI}/api/tasks/${taskId}/users/${userId}`, {
            method: 'DELETE',
            headers: obtenerHeadersAuth()
        });

        if (!response.ok) {
            throw new Error(`Error al remover usuario de la tarea. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al remover usuario: ${error.message}`);
        throw error;
    }
};
