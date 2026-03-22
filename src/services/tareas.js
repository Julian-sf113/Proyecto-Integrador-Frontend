// =============================================================================
// SERVICIOS DE TAREAS - services/tareas.js
// =============================================================================
// Funciones utilitarias para transformar y mostrar datos de tareas.
// Los estados ahora mapean a los valores del backend.

export function obtenerClaseEstado(estado) {
    if (estado === 'completada') return 'status--completed';
    if (estado === 'en progreso') return 'status--in-progress';
    if (estado === 'pendiente') return 'status--pending';
    return 'status--pending';
}

export function obtenerEtiquetaEstado(estado) {
    if (estado === 'completada') return 'Completada';
    if (estado === 'en progreso') return 'En Progreso';
    if (estado === 'pendiente') return 'Pendiente';
    return 'Pendiente';
}

export function obtenerClasePrioridad(prioridad) {
    if (prioridad === 'alta') return 'priority--alta';
    if (prioridad === 'media') return 'priority--media';
    if (prioridad === 'baja') return 'priority--baja';
    return 'priority--media';
}

export function obtenerEtiquetaPrioridad(prioridad) {
    if (prioridad === 'alta') return 'Alta';
    if (prioridad === 'media') return 'Media';
    if (prioridad === 'baja') return 'Baja';
    return 'Media';
}

export function obtenerTextoFechaHoraActual() {
    return new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function formatearFechaISO(fechaISO) {
    if (!fechaISO) return obtenerTextoFechaHoraActual();
    return new Date(fechaISO).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function obtenerInicialesUsuario(nombreCompleto) {
    const palabras = nombreCompleto.trim().split(/\s+/);

    if (palabras.length === 1) {
        return palabras[0].slice(0, 2).toUpperCase();
    }

    return palabras.map((palabra) => palabra[0]).join('').toUpperCase();
}
