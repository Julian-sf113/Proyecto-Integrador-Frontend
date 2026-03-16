export function obtenerClaseEstado(estado) {
    if (estado === 'finalizada') return 'status-completed';
    if (estado === 'en-proceso') return 'status-progress';
    if (estado === 'incompleta' || estado === 'pendiente') return 'status-pending';
    return 'status-pending';
}

export function obtenerEtiquetaEstado(estado) {
    if (estado === 'finalizada') return 'Completada';
    if (estado === 'en-proceso') return 'En Proceso';
    if (estado === 'incompleta' || estado === 'pendiente') return 'Pendiente';
    return 'Pendiente';
}

export function obtenerTextoFechaHoraActual(fecha = null) {
    const fechaObj = fecha ? new Date(fecha) : new Date();
    return fechaObj.toLocaleDateString('es-ES', {
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
