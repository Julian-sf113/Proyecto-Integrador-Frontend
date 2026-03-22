import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Asigna usuarios a una tarea (merge con los existentes)
 * @param {string} taskId - El ID de la tarea
 * @param {string[]} userIds - Array de IDs de usuarios a asignar
 * @returns {Promise<Object>} - Datos de la tarea actualizada
 */
export const assignUsersToTask = async (taskId, userIds) => {
    try {
        const response = await fetch(`${urlAPI}/api/tasks/${taskId}/assign`, {
            method: 'POST',
            headers: obtenerHeadersAuth(),
            body: JSON.stringify({ userIds })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Error al asignar usuarios. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al asignar usuarios: ${error.message}`);
        throw error;
    }
};
