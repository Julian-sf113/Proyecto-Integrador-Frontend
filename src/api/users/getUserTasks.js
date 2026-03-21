import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Obtiene las tareas asignadas a un usuario
 * @param {string} userId - El ID del usuario
 * @returns {Promise<Object>} - { data: [tareas], user, count }
 */
export const getUserTasks = async (userId) => {
    try {
        const response = await fetch(`${urlAPI}/api/users/${userId}/tasks`, {
            headers: obtenerHeadersAuth()
        });

        if (!response.ok) {
            throw new Error(`Error al obtener tareas del usuario. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado;

    } catch (error) {
        console.error(`Ocurrió un problema al obtener tareas del usuario: ${error.message}`);
        throw error;
    }
};
