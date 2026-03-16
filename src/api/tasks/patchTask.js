// Importamos la URL base de la API desde el archivo principal
import { urlAPI } from "../../config/index.js";

/**
 * Actualiza parcialmente una tarea por su ID
 * @param {string} taskId - El ID de la tarea a actualizar
 * @param {Object} taskData - Objeto con los campos a actualizar {title, body, status}
 * @returns {Promise<Object>} - Retorna una promesa con los datos de la tarea actualizada
 */
export const patchTask = async (taskId, taskData) => {
    try {
        const response = await fetch(`${urlAPI}/tasks/${taskId}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar la tarea. Código: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(`Ocurrió un problema al actualizar la tarea: ${error.message}`);
        throw error;
    }
};

/**
 * Actualiza solo el estado de una tarea por su ID
 * @param {string} taskId - El ID de la tarea a actualizar
 * @param {Object} statusData - Objeto con el estado {status}
 * @returns {Promise<Object>} - Retorna una promesa con los datos de la tarea actualizada
 */
export const updateTaskStatus = async (taskId, statusData) => {
    try {
        const response = await fetch(`${urlAPI}/tasks/${taskId}/status`, {
            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(statusData)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el estado de la tarea. Código: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(`Ocurrió un problema al actualizar el estado de la tarea: ${error.message}`);
        throw error;
    }
};
