import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Obtiene los usuarios asignados a una tarea
 * @param {string} taskId - El ID de la tarea
 * @returns {Promise<Object>} - { data: [usuarios], task, count }
 */
export const getTaskUsers = async (taskId) => {
    try {
        const response = await fetch(`${urlAPI}/api/tasks/${taskId}/users`, {
            headers: obtenerHeadersAuth()
        });

        if (!response.ok) {
            throw new Error(`Error al obtener usuarios de la tarea. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado;

    } catch (error) {
        console.error(`Ocurrió un problema al obtener usuarios de la tarea: ${error.message}`);
        throw error;
    }
};
