// =============================================================================
// FUNCIONES DE MANEJO DE TAREAS - controllers/funcionesTareas.js
// =============================================================================
// Este archivo contiene todas las funciones relacionadas con el CRUD de tareas:
// creación, eliminación, actualización y renderizado en el DOM.
// Gestiona estado.tareas como fuente de verdad en memoria para que
// funcionesFiltros pueda aplicar filtros y sort sin recargar la página (RF01/RF02).

import { deleteTask } from '../api/index.js';
import { estadoVacio, contenedorTareas, estado } from './variables.js';
import { actualizarContador } from './funcionesUI.js';
import { obtenerInicialesUsuario, obtenerClaseEstado, obtenerEtiquetaEstado, obtenerTextoFechaHoraActual } from '../services/index.js';
import { crearTarjetaTarea } from '../ui/index.js';
import { aplicarFiltrosYOrden } from './funcionesFiltros.js';

// =============================================================================
// FUNCIONES DE ESTADO EN MEMORIA
// =============================================================================

/**
 * Agrega una tarea al array en memoria (estado.tareas) sin renderizar.
 * Usar durante la carga inicial por lotes para evitar re-renders innecesarios.
 * Llamar aplicarFiltrosYOrden() una sola vez después del bucle de carga.
 * @param {Object} tareaCreada - Objeto de la tarea proveniente de la API
 */
export function agregarTareaAlEstado(tareaCreada) {
    const nombreCompleto = `${estado.usuarioActual.firstName} ${estado.usuarioActual.lastName}`;
    const fechaHora = obtenerTextoFechaHoraActual();
    const fechaISO = new Date().toISOString();

    estado.tareas.push({
        ...tareaCreada,
        _usuario: nombreCompleto,
        _fechaHora: fechaHora,
        _fechaISO: fechaISO
    });

    estado.totalTareas = estado.tareas.length;
}

// =============================================================================
// FUNCIONES DE ELIMINACIÓN Y CREACIÓN DE TAREAS
// =============================================================================

/**
 * Elimina una tarea del servidor, del DOM y de estado.tareas.
 * Mantiene la animación de eliminación en el card y sincroniza el estado.
 * @param {string} taskId - ID de la tarea a eliminar
 * @param {HTMLElement} card - Elemento de la tarjeta de tarea
 */
export async function eliminarTarea(taskId, card) {
    card.classList.add('eliminando');

    try {
        await deleteTask(taskId);

        // Eliminar del DOM
        card.remove();

        // Sincronizar estado.tareas
        estado.tareas = estado.tareas.filter(
            (t) => String(t.id) !== String(taskId)
        );
        estado.totalTareas = estado.tareas.length;
        actualizarContador();

        // Mostrar empty state si no quedan tareas
        if (estado.tareas.length === 0) {
            const emptyState = contenedorTareas.querySelector('#emptyState');
            if (emptyState) emptyState.classList.remove('hidden');
        }
    } catch (error) {
        card.classList.remove('eliminando');
        console.error('Error al eliminar la tarea:', error);
    }
}

/**
 * Agrega una tarea a estado.tareas Y la renderiza en el DOM.
 * Llama a aplicarFiltrosYOrden() para que el nuevo card respete los filtros
 * y el orden activos en ese momento.
 * @param {Object} tareaCreada - Objeto de la tarea creada
 */
export function pintarTareaEnDOM(tareaCreada) {
    const nombreCompleto = `${estado.usuarioActual.firstName} ${estado.usuarioActual.lastName}`;
    const fechaHora = obtenerTextoFechaHoraActual();
    const fechaISO = new Date().toISOString();

    estado.tareas.push({
        ...tareaCreada,
        _usuario: nombreCompleto,
        _fechaHora: fechaHora,
        _fechaISO: fechaISO
    });

    estado.totalTareas = estado.tareas.length;
    actualizarContador();

    // Re-renderizar respetando filtros y orden activos
    aplicarFiltrosYOrden();
}
