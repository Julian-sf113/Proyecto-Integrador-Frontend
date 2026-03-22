import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Actualiza una tarea por su ID (PUT completo)
 * @param {string} taskId - El ID de la tarea a actualizar
 * @param {Object} taskData - Campos a actualizar { title, description, status, priority, assignedUserIds }
 * @returns {Promise<Object>} - Datos de la tarea actualizada
 */
export const updateTask = async (taskId, taskData) => {
    try {
        const response = await fetch(`${urlAPI}/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: obtenerHeadersAuth(),
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Error al actualizar la tarea. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al actualizar la tarea: ${error.message}`);
        throw error;
    }
};
