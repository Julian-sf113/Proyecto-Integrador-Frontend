// =============================================================================
// FUNCIONES DE FILTROS - controllers/user/funcionesFiltros.js
// =============================================================================
// Filtrado y ordenamiento de tareas en la vista de usuario.

import { estado } from './variables.js';
import { renderizarTareas } from './funcionesTareas.js';

// Orden de estados para ordenamiento
const ORDEN_ESTADO = { 'pendiente': 0, 'en progreso': 1, 'completada': 2 };

/**
 * Aplica los filtros activos y reordena las tareas
 */
export function aplicarFiltrosYOrden() {
    let tareasFiltradas = [...estado.tareas];

    // Filtro por estado
    if (estado.filtros.estado) {
        tareasFiltradas = tareasFiltradas.filter(
            tarea => tarea.status === estado.filtros.estado
        );
    }

    // Filtro por texto
    if (estado.filtros.texto) {
        const texto = estado.filtros.texto.toLowerCase();
        tareasFiltradas = tareasFiltradas.filter(tarea =>
            tarea.title.toLowerCase().includes(texto) ||
            (tarea.description && tarea.description.toLowerCase().includes(texto))
        );
    }

    // Ordenamiento
    tareasFiltradas.sort((a, b) => {
        let comparacion = 0;

        if (estado.ordenamiento.campo === 'fecha') {
            const fechaA = new Date(a.createdAt || 0).getTime();
            const fechaB = new Date(b.createdAt || 0).getTime();
            comparacion = fechaA - fechaB;
        } else if (estado.ordenamiento.campo === 'nombre') {
            comparacion = (a.title || '').localeCompare(b.title || '');
        } else if (estado.ordenamiento.campo === 'estado') {
            comparacion = (ORDEN_ESTADO[a.status] || 0) - (ORDEN_ESTADO[b.status] || 0);
        }

        return estado.ordenamiento.direccion === 'asc' ? comparacion : -comparacion;
    });

    estado.tareasVisibles = tareasFiltradas;
    renderizarTareas(tareasFiltradas);
}
