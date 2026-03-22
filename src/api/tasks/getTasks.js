import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Obtiene todas las tareas (requiere rol admin)
 * @returns {Promise<Array>} - Lista de tareas
 */
export const getTasks = async () => {
    try {
        const response = await fetch(`${urlAPI}/api/tasks`, {
            headers: obtenerHeadersAuth()
        });

        if (!response.ok) {
            throw new Error(`Error al obtener las tareas. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al obtener las tareas: ${error.message}`);
        throw error;
    }
};
