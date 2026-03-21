import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Actualiza el estado de una tarea (disponible para admin y usuario asignado)
 * @param {string} taskId - El ID de la tarea
 * @param {string} status - Nuevo estado (pendiente, en progreso, completada)
 * @returns {Promise<Object>} - Datos de la tarea actualizada
 */
export const patchTaskStatus = async (taskId, status) => {
    try {
        const response = await fetch(`${urlAPI}/api/tasks/${taskId}/status`, {
            method: 'PATCH',
            headers: obtenerHeadersAuth(),
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Error al actualizar el estado. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al actualizar el estado: ${error.message}`);
        throw error;
    }
};
