// =============================================================================
// SECCIÓN ASIGNACIÓN - controllers/admin/seccionAsignacion.js
// =============================================================================
// Gestiona el panel de asignación múltiple de usuarios a tareas.

import { estado, assignmentOverlay, assignmentTaskName, assignmentUserSelector, btnGuardarAsignacion, btnCerrarAsignacion } from './variables.js';
import { assignUsersToTask } from '../../api/tasks/assignUsersToTask.js';
import { getTaskUsers } from '../../api/tasks/getTaskUsers.js';
import { renderizarSelectorUsuarios, obtenerUsuariosSeleccionados } from '../../ui/selectorUsuarios.js';
import { notificarExito, notificarError } from '../../utils/notificaciones.js';
import { cargarTareas } from './seccionTareas.js';

/**
 * Abre el panel de asignación para una tarea
 */
export async function abrirPanelAsignacion(taskId) {
    estado.asignandoTareaId = taskId;

    const tarea = estado.tareas.find(t => String(t.id) === String(taskId));
    if (tarea) {
        assignmentTaskName.textContent = tarea.title;
    }

    try {
        // Obtener usuarios actualmente asignados
        const resultado = await getTaskUsers(taskId);
        const asignados = (resultado.data || []).map(u => String(u.id));

        // Renderizar checkboxes con usuarios pre-seleccionados
        renderizarSelectorUsuarios(assignmentUserSelector, estado.usuarios, asignados);

        assignmentOverlay.classList.remove('hidden');

    } catch (error) {
        notificarError('Error al cargar usuarios asignados.');
    }
}

/**
 * Configura los eventos del panel de asignación
 */
export function configurarEventosAsignacion() {
    btnGuardarAsignacion.addEventListener('click', async () => {
        const seleccionados = obtenerUsuariosSeleccionados(assignmentUserSelector);

        if (seleccionados.length === 0) {
            notificarError('Selecciona al menos un usuario.');
            return;
        }

        try {
            await assignUsersToTask(estado.asignandoTareaId, seleccionados);
            notificarExito('Usuarios asignados correctamente.');
            assignmentOverlay.classList.add('hidden');
            estado.asignandoTareaId = null;
            await cargarTareas();
        } catch (error) {
            notificarError(error.message);
        }
    });

    btnCerrarAsignacion.addEventListener('click', () => {
        assignmentOverlay.classList.add('hidden');
        estado.asignandoTareaId = null;
    });
}
