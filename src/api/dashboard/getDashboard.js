import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Obtiene las estadísticas del dashboard (admin)
 * @returns {Promise<Object>} - { totals, tasksByStatus, tasksByPriority }
 */
export const getDashboard = async () => {
    try {
        const response = await fetch(`${urlAPI}/api/dashboard`, {
            headers: obtenerHeadersAuth()
        });

        if (!response.ok) {
            throw new Error(`Error al obtener dashboard. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al obtener el dashboard: ${error.message}`);
        throw error;
    }
};
