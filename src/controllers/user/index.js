// =============================================================================
// CONTROLADOR PRINCIPAL - controllers/user/index.js
// =============================================================================
// Inicializa la vista de usuario: carga tareas asignadas, configura filtros,
// ordenamiento, exportación y cambio de estado de tareas.

import { estado, inicializarReferencias, contenedorTareas, filtroEstadoBotones, filtroTexto, ordenCampo, ordenDireccion, exportarBtn } from './variables.js';
import { actualizarContador } from './funcionesUI.js';
import { agregarTareaAlEstado, renderizarTareas } from './funcionesTareas.js';
import { aplicarFiltrosYOrden } from './funcionesFiltros.js';
import { inicializarNavbar } from '../../ui/navBar.js';
import { getUserTasks } from '../../api/users/getUserTasks.js';
import { patchTaskStatus } from '../../api/tasks/patchTaskStatus.js';
import { notificarExito, notificarError, notificarInfo } from '../../utils/notificaciones.js';
import { exportarTareasJSON } from '../../services/exportar.js';

// =============================================================================
// INICIALIZACIÓN
// =============================================================================
export async function iniciarVistaUsuario() {
    inicializarReferencias();
    inicializarNavbar(estado.usuarioActual);

    await cargarTareasUsuario();
    configurarEventos();
}

// =============================================================================
// CARGA DE TAREAS
// =============================================================================
async function cargarTareasUsuario() {
    try {
        const resultado = await getUserTasks(estado.usuarioActual.id);
        const tareas = resultado.data || [];

        estado.tareas = [];
        estado.totalTareas = 0;

        tareas.forEach(tarea => agregarTareaAlEstado(tarea));

        aplicarFiltrosYOrden();
        actualizarContador();

    } catch (error) {
        notificarError('Error al cargar las tareas.');
    }
}

// =============================================================================
// CONFIGURACIÓN DE EVENTOS
// =============================================================================
function configurarEventos() {
    // Cambio de estado de tarea (event delegation)
    contenedorTareas.addEventListener('change', async (evento) => {
        const selectEstado = evento.target.closest('.btn-cambiar-estado');
        if (!selectEstado) return;

        const taskId = selectEstado.getAttribute('data-id');
        const nuevoEstado = selectEstado.value;

        try {
            await patchTaskStatus(taskId, nuevoEstado);

            // Actualizar en estado local
            const tarea = estado.tareas.find(t => String(t.id) === String(taskId));
            if (tarea) {
                tarea.status = nuevoEstado;
                tarea.updatedAt = new Date().toISOString();
            }

            aplicarFiltrosYOrden();
            notificarExito('Estado de la tarea actualizado.');

        } catch (error) {
            notificarError('Error al actualizar el estado.');
            // Revertir select al valor anterior
            if (evento.target.closest('.btn-cambiar-estado')) {
                const tareaOriginal = estado.tareas.find(t => String(t.id) === String(taskId));
                if (tareaOriginal) {
                    selectEstado.value = tareaOriginal.status;
                }
            }
        }
    });

    // Filtros por estado
    filtroEstadoBotones.addEventListener('click', (evento) => {
        const btn = evento.target.closest('.btn-filtro');
        if (!btn) return;

        filtroEstadoBotones.querySelectorAll('.btn-filtro').forEach(b => {
            b.classList.remove('btn-filtro--activo');
        });
        btn.classList.add('btn-filtro--activo');

        estado.filtros.estado = btn.dataset.estado;
        aplicarFiltrosYOrden();
    });

    // Filtro por texto
    filtroTexto.addEventListener('input', (evento) => {
        estado.filtros.texto = evento.target.value.trim();
        aplicarFiltrosYOrden();
    });

    // Ordenamiento por campo
    ordenCampo.addEventListener('change', (evento) => {
        estado.ordenamiento.campo = evento.target.value;
        aplicarFiltrosYOrden();
    });

    // Dirección de ordenamiento
    ordenDireccion.addEventListener('click', () => {
        const actual = estado.ordenamiento.direccion;
        const nueva = actual === 'asc' ? 'desc' : 'asc';
        estado.ordenamiento.direccion = nueva;
        ordenDireccion.dataset.direccion = nueva;

        const icono = ordenDireccion.querySelector('i');
        icono.className = nueva === 'asc' ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';

        aplicarFiltrosYOrden();
    });

    // Exportar JSON
    exportarBtn.addEventListener('click', () => {
        if (estado.tareasVisibles.length === 0) {
            notificarInfo('No hay tareas para exportar.');
            return;
        }

        const json = exportarTareasJSON(estado.tareasVisibles);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const fechaArchivo = new Date().toISOString().split('T')[0];
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = `mis-tareas-${fechaArchivo}.json`;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);

        notificarExito('Tareas exportadas correctamente.');
    });
}
