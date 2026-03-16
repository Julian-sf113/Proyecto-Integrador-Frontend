// Importamos la URL base de la API desde el archivo principal
import { urlAPI } from "../../config/index.js";

/**
 * Obtiene una tarea por su ID
 * @param {string} taskId - El ID de la tarea a buscar
 * @returns {Promise<Object>} - Retorna una promesa con los datos de la tarea
 */
export const getTaskById = async (taskId) => {
    try {
        // Hacemos una petición GET a la API para buscar la tarea por su ID
        const response = await fetch(`${urlAPI}/tasks/${taskId}`);

        // Verificamos si la respuesta de la API no fue exitosa
        if (!response.ok) {
            let mensajeError = `Error en la petición. Código: ${response.status}`;

            if (response.status === 404) {
                mensajeError = "Tarea no encontrada.";
            }

            throw new Error(mensajeError);
        }

        // Si la respuesta es exitosa, convertimos el cuerpo de la respuesta a JSON
        const data = await response.json();

        // Retornamos los datos de la tarea
        return data;

    } catch (error) {
        console.error(`Ocurrió un problema al obtener la tarea: ${error.message}`);
        throw error;
    }
};

/**
 * Obtiene un usuario por su número de documento (ID)
 * @param {string} id - El ID del usuario a buscar
 * @returns {Promise<Object>} - Retorna una promesa con los datos del usuario
 */
export const getOneUser = async (id) => {
    try {
        // Hacemos una petición GET a la API para buscar el usuario por su ID
        const response = await fetch(`${urlAPI}/users/${id}`);

        // Verificamos si la respuesta de la API no fue exitosa (status diferente a 200-299)
        if (!response.ok) {
            // Lanzamos un error personalizado dependiendo del código de estado
            let mensajeError = `Error en la petición. Código: ${response.status}`;

            if (response.status === 404) {
                mensajeError = "Usuario no encontrado.";
            }

            throw new Error(mensajeError);
        }

        // Si la respuesta es exitosa, convertimos el cuerpo de la respuesta a JSON
        const data = await response.json();

        // Retornamos los datos del usuario
        return data;

    } catch (error) {
        console.error(`Ocurrió un problema al obtener el usuario: ${error.message}`);
        throw error;
    }
};
