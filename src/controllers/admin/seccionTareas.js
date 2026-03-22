// =============================================================================
// SECCIÓN TAREAS - controllers/admin/seccionTareas.js
// =============================================================================
// Gestión global de tareas: CRUD, filtros y visualización para el admin.

import { estado, adminTasksContainer, taskFormContainer, adminTaskForm, taskFormTitle, btnNuevaTarea, taskFormCancelBtn, userSelectorContainer, adminFiltroUsuario, adminFiltroEstado, adminFiltroPrioridad } from './variables.js';
import { getTasks } from '../../api/tasks/getTasks.js';
import { createTask } from '../../api/tasks/postTask.js';
import { updateTask } from '../../api/tasks/patchTask.js';
import { deleteTask } from '../../api/tasks/deleteTask.js';
import { filterTasks } from '../../api/tasks/filterTasks.js';
import { crearTarjetaTarea } from '../../ui/tarjetaTarea.js';
import { renderizarSelectorUsuarios, obtenerUsuariosSeleccionados } from '../../ui/selectorUsuarios.js';
import { obtenerClaseEstado, obtenerEtiquetaEstado, obtenerClasePrioridad, obtenerEtiquetaPrioridad, formatearFechaISO } from '../../services/tareas.js';
import { notificarExito, notificarError } from '../../utils/notificaciones.js';
import { confirmarEliminacionTarea } from '../../utils/alertas.js';
import { abrirPanelAsignacion } from './seccionAsignacion.js';

// =============================================================================
// CARGA DE TAREAS
// =============================================================================
export async function cargarTareas() {
    try {
        estado.tareas = await getTasks();
        renderizarTareas(estado.tareas);
    } catch (error) {
        notificarError('Error al cargar tareas.');
    }
}

function renderizarTareas(tareas) {
    adminTasksContainer.textContent = '';

    if (tareas.length === 0) {
        const vacio = document.createElement('p');
        vacio.className = 'admin-tasks-list__empty';
        vacio.textContent = 'No hay tareas registradas.';
        adminTasksContainer.appendChild(vacio);
        return;
    }

    tareas.forEach(tarea => {
        const estadoClase = obtenerClaseEstado(tarea.status);
        const estadoTexto = obtenerEtiquetaEstado(tarea.status);
        const fechaHora = formatearFechaISO(tarea.createdAt);

        const tarjeta = crearTarjetaTarea(
            'Administrador',
            'AD',
            tarea,
            estadoClase,
            estadoTexto,
            fechaHora,
            {
                mostrarPrioridad: true,
                prioridadClase: obtenerClasePrioridad(tarea.priority),
                prioridadTexto: obtenerEtiquetaPrioridad(tarea.priority),
                mostrarAsignados: true,
                mostrarAcciones: true,
                accionesAdmin: true
            }
        );

        tarjeta.setAttribute('data-task-id', tarea.id);
        adminTasksContainer.appendChild(tarjeta);
    });
}

// =============================================================================
// LLENAR SELECT DE USUARIOS EN FILTROS
// =============================================================================
export function llenarFiltroUsuarios() {
    // Limpiar opciones existentes (mantener "Todos")
    while (adminFiltroUsuario.options.length > 1) {
        adminFiltroUsuario.remove(1);
    }

    estado.usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = `${usuario.firstName} ${usuario.lastName}`;
        adminFiltroUsuario.appendChild(option);
    });
}

// =============================================================================
// CONFIGURACIÓN DE EVENTOS
// =============================================================================
export function configurarEventosTareas() {
    // Botón nueva tarea
    btnNuevaTarea.addEventListener('click', () => {
        estado.editandoTareaId = null;
        taskFormTitle.textContent = 'Crear Tarea';
        adminTaskForm.reset();
        renderizarSelectorUsuarios(userSelectorContainer, estado.usuarios);
        taskFormContainer.classList.remove('hidden');
    });

    // Cancelar formulario
    taskFormCancelBtn.addEventListener('click', () => {
        taskFormContainer.classList.add('hidden');
        adminTaskForm.reset();
        estado.editandoTareaId = null;
    });

    // Submit formulario de tarea
    adminTaskForm.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        evento.stopPropagation();

        const titulo = document.querySelector('#adminTaskTitle').value.trim();
        const descripcion = document.querySelector('#adminTaskDescription').value.trim();
        const prioridad = document.querySelector('#adminTaskPriority').value;
        const estadoTarea = document.querySelector('#adminTaskStatus').value;
        const usuariosSeleccionados = obtenerUsuariosSeleccionados(userSelectorContainer);

        if (!titulo) {
            notificarError('El título es obligatorio.');
            return;
        }

        const datos = {
            title: titulo,
            description: descripcion,
            priority: prioridad,
            status: estadoTarea,
            assignedUserIds: usuariosSeleccionados
        };

        try {
            if (estado.editandoTareaId) {
                await updateTask(estado.editandoTareaId, datos);
                notificarExito('Tarea actualizada correctamente.');
            } else {
                await createTask(datos);
                notificarExito('Tarea creada correctamente.');
            }

            taskFormContainer.classList.add('hidden');
            adminTaskForm.reset();
            estado.editandoTareaId = null;
            await cargarTareas();

        } catch (error) {
            notificarError(error.message);
        }
    });

    // Event delegation para acciones en tarjetas de tarea
    adminTasksContainer.addEventListener('click', async (evento) => {
        const btnEditar = evento.target.closest('.btn-editar');
        const btnAsignar = evento.target.closest('.btn-asignar');
        const btnEliminar = evento.target.closest('.btn-eliminar');

        if (btnEditar) {
            const taskId = btnEditar.getAttribute('data-id');
            editarTarea(taskId);
        }

        if (btnAsignar) {
            const taskId = btnAsignar.getAttribute('data-id');
            abrirPanelAsignacion(taskId);
        }

        if (btnEliminar) {
            const taskId = btnEliminar.getAttribute('data-id');
            await eliminarTareaAdmin(taskId);
        }
    });

    // Filtros
    adminFiltroUsuario.addEventListener('change', aplicarFiltrosAdmin);
    adminFiltroEstado.addEventListener('change', aplicarFiltrosAdmin);
    adminFiltroPrioridad.addEventListener('change', aplicarFiltrosAdmin);
}

// =============================================================================
// FILTROS ADMIN
// =============================================================================
async function aplicarFiltrosAdmin() {
    const userId = adminFiltroUsuario.value;
    const statusVal = adminFiltroEstado.value;
    const priority = adminFiltroPrioridad.value;

    // Si no hay filtros activos, mostrar todas
    if (!userId && !statusVal && !priority) {
        renderizarTareas(estado.tareas);
        return;
    }

    try {
        const resultado = await filterTasks({ userId, status: statusVal, priority });
        renderizarTareas(resultado.data || []);
    } catch (error) {
        notificarError('Error al filtrar tareas.');
    }
}

// =============================================================================
// ACCIONES
// =============================================================================
function editarTarea(taskId) {
    const tarea = estado.tareas.find(t => String(t.id) === String(taskId));
    if (!tarea) return;

    estado.editandoTareaId = taskId;
    taskFormTitle.textContent = 'Editar Tarea';

    document.querySelector('#adminTaskTitle').value = tarea.title;
    document.querySelector('#adminTaskDescription').value = tarea.description || '';
    document.querySelector('#adminTaskPriority').value = tarea.priority || 'media';
    document.querySelector('#adminTaskStatus').value = tarea.status || 'pendiente';

    const asignados = (tarea.assignedUserIds || []).map(String);
    renderizarSelectorUsuarios(userSelectorContainer, estado.usuarios, asignados);

    taskFormContainer.classList.remove('hidden');
}

async function eliminarTareaAdmin(taskId) {
    const confirmado = await confirmarEliminacionTarea();
    if (!confirmado) return;

    try {
        await deleteTask(taskId);
        notificarExito('Tarea eliminada correctamente.');
        await cargarTareas();
    } catch (error) {
        notificarError(error.message);
    }
}
