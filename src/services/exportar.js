// =============================================================================
// SERVICIO DE EXPORTACIÓN DE TAREAS - services/exportar.js
// =============================================================================
// RF04: Módulo de procesamiento de datos para exportación.
// Responsabilidad única: transformar datos de tareas a formato JSON exportable.

/**
 * Convierte un array de tareas al formato JSON exportable.
 * @param {Array<Object>} tareas - Array de tareas
 * @returns {string} - Cadena JSON formateada lista para descarga
 */
export function exportarTareasJSON(tareas) {
    const datos = tareas.map((tarea) => ({
        id: tarea.id,
        titulo: tarea.title,
        descripcion: tarea.description || tarea.body || '',
        estado: tarea.status,
        prioridad: tarea.priority || '',
        fechaCreacion: tarea.createdAt || tarea._fechaHora || ''
    }));

    return JSON.stringify(datos, null, 2);
}
