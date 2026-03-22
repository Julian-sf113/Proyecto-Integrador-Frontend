// =============================================================================
// VARIABLES Y ESTADO - controllers/admin/variables.js
// =============================================================================
// Selectores del DOM y estado centralizado para la vista de administrador.

import { obtenerUsuario } from '../../auth/tokenManager.js';

// =============================================================================
// ESTADO CENTRALIZADO
// =============================================================================
export const estado = {
    usuarioActual: obtenerUsuario(),
    usuarios: [],
    tareas: [],
    editandoUsuarioId: null,
    editandoTareaId: null,
    asignandoTareaId: null
};

// =============================================================================
// REFERENCIAS AL DOM
// =============================================================================
// Dashboard
export let dashboardGrid;

// Usuarios
export let seccionUsuarios;
export let usersListContainer;
export let userFormContainer;
export let userForm;
export let userFormTitle;
export let btnNuevoUsuario;
export let userFormCancelBtn;

// Tareas
export let seccionTareas;
export let adminTasksContainer;
export let taskFormContainer;
export let adminTaskForm;
export let taskFormTitle;
export let btnNuevaTarea;
export let taskFormCancelBtn;
export let userSelectorContainer;
export let adminFiltroUsuario;
export let adminFiltroEstado;
export let adminFiltroPrioridad;

// Asignación
export let assignmentOverlay;
export let assignmentTaskName;
export let assignmentUserSelector;
export let btnGuardarAsignacion;
export let btnCerrarAsignacion;

// Modal
export let modalOverlay;
export let modalContent;

export function inicializarReferencias() {
    dashboardGrid = document.querySelector('#dashboardGrid');

    seccionUsuarios = document.querySelector('#seccionUsuarios');
    usersListContainer = document.querySelector('#usersListContainer');
    userFormContainer = document.querySelector('#userFormContainer');
    userForm = document.querySelector('#userForm');
    userFormTitle = document.querySelector('#userFormTitle');
    btnNuevoUsuario = document.querySelector('#btnNuevoUsuario');
    userFormCancelBtn = document.querySelector('#userFormCancelBtn');

    seccionTareas = document.querySelector('#seccionTareas');
    adminTasksContainer = document.querySelector('#adminTasksContainer');
    taskFormContainer = document.querySelector('#taskFormContainer');
    adminTaskForm = document.querySelector('#adminTaskForm');
    taskFormTitle = document.querySelector('#taskFormTitle');
    btnNuevaTarea = document.querySelector('#btnNuevaTarea');
    taskFormCancelBtn = document.querySelector('#taskFormCancelBtn');
    userSelectorContainer = document.querySelector('#userSelectorContainer');
    adminFiltroUsuario = document.querySelector('#adminFiltroUsuario');
    adminFiltroEstado = document.querySelector('#adminFiltroEstado');
    adminFiltroPrioridad = document.querySelector('#adminFiltroPrioridad');

    assignmentOverlay = document.querySelector('#assignmentOverlay');
    assignmentTaskName = document.querySelector('#assignmentTaskName');
    assignmentUserSelector = document.querySelector('#assignmentUserSelector');
    btnGuardarAsignacion = document.querySelector('#btnGuardarAsignacion');
    btnCerrarAsignacion = document.querySelector('#btnCerrarAsignacion');

    modalOverlay = document.querySelector('#feedbackModal');
    modalContent = document.querySelector('#feedbackModalContent');
}
