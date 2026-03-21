import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Filtra tareas por diferentes criterios (admin)
 * @param {Object} filtros - { userId, status, priority, dateFrom, dateTo }
 * @returns {Promise<Object>} - { data: [tareas], filters, count }
 */
export const filterTasks = async (filtros = {}) => {
    try {
        const params = new URLSearchParams();

        if (filtros.userId) params.append('userId', filtros.userId);
        if (filtros.status) params.append('status', filtros.status);
        if (filtros.priority) params.append('priority', filtros.priority);
        if (filtros.dateFrom) params.append('dateFrom', filtros.dateFrom);
        if (filtros.dateTo) params.append('dateTo', filtros.dateTo);

        const queryString = params.toString();
        const url = `${urlAPI}/api/tasks/filter${queryString ? '?' + queryString : ''}`;

        const response = await fetch(url, {
            headers: obtenerHeadersAuth()
        });

        if (!response.ok) {
            throw new Error(`Error al filtrar tareas. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado;

    } catch (error) {
        console.error(`Ocurrió un problema al filtrar tareas: ${error.message}`);
        throw error;
    }
};
