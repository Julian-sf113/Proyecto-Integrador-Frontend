import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Obtiene una tarea por su ID
 * @param {string} taskId - El ID de la tarea
 * @returns {Promise<Object>} - Datos de la tarea
 */
export const getTaskById = async (taskId) => {
    try {
        const response = await fetch(`${urlAPI}/api/tasks/${taskId}`, {
            headers: obtenerHeadersAuth()
        });

        if (!response.ok) {
            let mensajeError = `Error en la petición. Código: ${response.status}`;
            if (response.status === 404) {
                mensajeError = "Tarea no encontrada.";
            }
            throw new Error(mensajeError);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al obtener la tarea: ${error.message}`);
        throw error;
    }
};
