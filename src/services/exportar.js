// =============================================================================
// SERVICIO DE EXPORTACIÓN DE TAREAS - services/exportar.js
// =============================================================================
// RF04: Módulo de procesamiento de datos para exportación.
// Responsabilidad única: transformar datos de tareas a formato JSON exportable.
// No contiene lógica de interfaz de usuario.

/**
 * Convierte un array de tareas al formato JSON exportable.
 * Mapea los campos internos a nombres legibles para el archivo exportado.
 * @param {Array<Object>} tareas - Array de tareas del estado de la aplicación
 * @returns {string} - Cadena JSON formateada lista para descarga
 */
export function exportarTareasJSON(tareas) {
    const datos = tareas.map((tarea) => ({
        id: tarea.id,
        titulo: tarea.title,
        descripcion: tarea.body,
        estado: tarea.status,
        usuario: tarea._usuario,
        fechaCreacion: tarea._fechaHora
    }));

    return JSON.stringify(datos, null, 2);
}
