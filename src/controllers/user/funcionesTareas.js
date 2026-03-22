// =============================================================================
// FUNCIONES DE TAREAS - controllers/user/funcionesTareas.js
// =============================================================================
// Gestión de tareas en la vista de usuario: pintar y actualizar estado.

import { estado, contenedorTareas, estadoVacio } from './variables.js';
import { actualizarContador } from './funcionesUI.js';
import { crearTarjetaTarea } from '../../ui/tarjetaTarea.js';
import {
    obtenerClaseEstado,
    obtenerEtiquetaEstado,
    obtenerClasePrioridad,
    obtenerEtiquetaPrioridad,
    formatearFechaISO,
    obtenerInicialesUsuario
} from '../../services/tareas.js';

/**
 * Agrega una tarea al estado sin renderizar
 */
export function agregarTareaAlEstado(tarea) {
    estado.tareas.push(tarea);
    estado.totalTareas = estado.tareas.length;
}

/**
 * Pinta una tarea individual en el DOM
 */
export function pintarTarea(tarea) {
    const usuario = estado.usuarioActual;
    const nombreCompleto = `${usuario.firstName} ${usuario.lastName}`;
    const iniciales = obtenerInicialesUsuario(nombreCompleto);
    const estadoClase = obtenerClaseEstado(tarea.status);
    const estadoTexto = obtenerEtiquetaEstado(tarea.status);
    const fechaHora = formatearFechaISO(tarea.createdAt);

    const tarjeta = crearTarjetaTarea(
        nombreCompleto,
        iniciales,
        tarea,
        estadoClase,
        estadoTexto,
        fechaHora,
        {
            mostrarPrioridad: true,
            prioridadClase: obtenerClasePrioridad(tarea.priority),
            prioridadTexto: obtenerEtiquetaPrioridad(tarea.priority),
            mostrarAcciones: true,
            accionesAdmin: false
        }
    );

    tarjeta.setAttribute('data-task-id', tarea.id);

    if (estadoVacio) {
        estadoVacio.classList.add('hidden');
    }

    contenedorTareas.appendChild(tarjeta);
}

/**
 * Limpia el contenedor de tareas y re-renderiza
 */
export function renderizarTareas(tareas) {
    // Limpiar contenedor (mantener emptyState)
    const tarjetas = contenedorTareas.querySelectorAll('.message-card');
    tarjetas.forEach(tarjeta => tarjeta.remove());

    if (tareas.length === 0) {
        estadoVacio.classList.remove('hidden');
    } else {
        estadoVacio.classList.add('hidden');
        tareas.forEach(tarea => pintarTarea(tarea));
    }

    estado.totalTareas = tareas.length;
    actualizarContador();
}
