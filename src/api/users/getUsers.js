import { urlAPI } from "../../config/index.js";
import { obtenerHeadersAuth } from "../../auth/tokenManager.js";

/**
 * Obtiene todos los usuarios del sistema (admin)
 * @returns {Promise<Array>} - Lista de usuarios
 */
export const getUsers = async () => {
    try {
        const response = await fetch(`${urlAPI}/api/users`, {
            headers: obtenerHeadersAuth()
        });

        if (!response.ok) {
            throw new Error(`Error al obtener usuarios. Código: ${response.status}`);
        }

        const resultado = await response.json();
        return resultado.data;

    } catch (error) {
        console.error(`Ocurrió un problema al obtener usuarios: ${error.message}`);
        throw error;
    }
};
