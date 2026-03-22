import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Crea una nueva tarea enviando los datos a la API
 * @param {Object} taskData - { title, description, status, priority, assignedUserIds }
 * @returns {Promise<Object>} - Datos de la tarea creada
 */
export const createTask = async (taskData) => {
    try {
        const response = await fetch(`${urlAPI}/api/tasks`, {
            method: 'POST',
            headers: obtenerHeadersAuth(),
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Error al crear la tarea. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al crear la tarea: ${error.message}`);
        throw error;
    }
};
