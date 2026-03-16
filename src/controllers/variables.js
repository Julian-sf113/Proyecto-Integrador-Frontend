// =============================================================================
// VARIABLES GLOBALES Y SELECTORES DEL DOM - controllers/variables.js
// =============================================================================
// Este archivo centraliza todas las variables globales y selectores del DOM.
// Facilita el mantenimiento y evita duplicación de selectores.

// =============================================================================
// SELECTORES DEL DOM
// =============================================================================
// Selectores CSS para todos los elementos del DOM que se utilizan en la aplicación
export const selectores = {
    formularioBusqueda: '#searchForm',
    inputDocumento: '#userDocument',
    errorDocumento: '#userDocumentError',
    formularioTarea: '#taskForm',
    inputTituloTarea: '#taskName',
    inputEstadoTarea: '#taskStatus',
    inputDescripcionTarea: '#taskDescription',
    botonGuardarTarea: '#submitBtn',
    errorTituloTarea: '#taskNameError',
    errorEstadoTarea: '#taskStatusError',
    errorDescripcionTarea: '#taskDescriptionError',
    contenedorTareas: '#tasksContainer',
    estadoVacio: '#emptyState',
    contadorTareas: '#tasksCount',
    seccionFormularioTarea: '.task-form-section',
    seccionListaTareas: '.tasks-section',
    modalOverlay: '#feedbackModal',
    modalContent: '#feedbackModalContent',
    // Nuevos selectores para vistas administrativas
    navegacionPrincipal: '.main-nav',
    btnVistaUsuario: '#btnVistaUsuario',
    btnVistaAdministracion: '#btnVistaAdministracion',
    btnVistaAdminGlobal: '#btnVistaAdminGlobal',
    // Administración de usuarios
    seccionAdministracion: '.admin-section',
    formularioUsuario: '#userForm',
    inputUsuarioNombre: '#userFirstName',
    inputUsuarioApellido: '#userLastName',
    inputUsuarioEmail: '#userEmail',
    inputUsuarioDocumento: '#userDocumentId',
    botonGuardarUsuario: '#saveUserBtn',
    errorUsuarioNombre: '#userFirstNameError',
    errorUsuarioApellido: '#userLastNameError',
    errorUsuarioEmail: '#userEmailError',
    errorUsuarioDocumento: '#userDocumentIdError',
    contenedorUsuarios: '#usersContainer',
    contadorUsuarios: '#usersCount',
    // Panel administrativo global
    seccionAdminGlobal: '.admin-global-section',
    contenedorTareasAdmin: '#adminTasksContainer',
    contadorTareasAdmin: '#adminTasksCount',
    filtroAdminUsuario: '#adminUserFilter',
    // Asignación múltiple
    contenedorAsignacion: '#assignmentContainer',
    checkboxUsuarios: '.user-checkbox'
};

// =============================================================================
// VARIABLES DE ESTADO GLOBAL
// =============================================================================
// Variables que mantienen el estado actual de la aplicación
export const estado = {
    usuarioActual: null,
    totalTareas: 0,
    editandoId: null,
    // RF01/RF02: Array de tareas en memoria (fuente de verdad para filtros y sort)
    tareas: [],
    // RF01/RF02: Tareas actualmente visibles tras aplicar filtros (usada por RF04)
    tareasVisibles: [],
    // RF01: Filtros activos
    filtros: {
        estado: '',
        texto: ''
    },
    // RF02: Ordenamiento activo
    ordenamiento: {
        campo: 'fecha',
        direccion: 'desc'
    },
    // Nuevas funcionalidades: Sistema de vistas
    vistaActual: 'usuario', // 'usuario', 'administracion', 'admin-global'
    esAdministrador: false,
    // Para administración de usuarios
    usuarios: [],
    editandoUsuarioId: null,
    // Para asignación múltiple
    usuariosSeleccionados: [],
    // Para panel administrativo
    todasLasTareas: [],
    filtroAdminUsuario: ''
};

// =============================================================================
// REFERENCIAS A ELEMENTOS DEL DOM
// =============================================================================
// Obtención de todos los elementos del DOM usando los selectores definidos
// Estas variables se usan throughout toda la aplicación
export const formularioBusqueda = document.querySelector(selectores.formularioBusqueda);
export const inputDocumento = document.querySelector(selectores.inputDocumento);
export const errorDocumento = document.querySelector(selectores.errorDocumento);
export const formularioTarea = document.querySelector(selectores.formularioTarea);
export const inputTituloTarea = document.querySelector(selectores.inputTituloTarea);
export const inputEstadoTarea = document.querySelector(selectores.inputEstadoTarea);
export const inputDescripcionTarea = document.querySelector(selectores.inputDescripcionTarea);
export const botonGuardarTarea = document.querySelector(selectores.botonGuardarTarea);
export const errorTituloTarea = document.querySelector(selectores.errorTituloTarea);
export const errorEstadoTarea = document.querySelector(selectores.errorEstadoTarea);
export const errorDescripcionTarea = document.querySelector(selectores.errorDescripcionTarea);
export const contenedorTareas = document.querySelector(selectores.contenedorTareas);
export const estadoVacio = document.querySelector(selectores.estadoVacio);
export const contadorTareas = document.querySelector(selectores.contadorTareas);
export const seccionFormularioTarea = document.querySelector(selectores.seccionFormularioTarea);
export const seccionListaTareas = document.querySelector(selectores.seccionListaTareas);
export const modalOverlay = document.querySelector(selectores.modalOverlay);
export const modalContent = document.querySelector(selectores.modalContent);
// Nuevas referencias para vistas administrativas
export const navegacionPrincipal = document.querySelector(selectores.navegacionPrincipal);
export const btnVistaUsuario = document.querySelector(selectores.btnVistaUsuario);
export const btnVistaAdministracion = document.querySelector(selectores.btnVistaAdministracion);
export const btnVistaAdminGlobal = document.querySelector(selectores.btnVistaAdminGlobal);
export const seccionAdministracion = document.querySelector(selectores.seccionAdministracion);
export const formularioUsuario = document.querySelector(selectores.formularioUsuario);
export const inputUsuarioNombre = document.querySelector(selectores.inputUsuarioNombre);
export const inputUsuarioApellido = document.querySelector(selectores.inputUsuarioApellido);
export const inputUsuarioEmail = document.querySelector(selectores.inputUsuarioEmail);
export const inputUsuarioDocumento = document.querySelector(selectores.inputUsuarioDocumento);
export const botonGuardarUsuario = document.querySelector(selectores.botonGuardarUsuario);
export const errorUsuarioNombre = document.querySelector(selectores.errorUsuarioNombre);
export const errorUsuarioApellido = document.querySelector(selectores.errorUsuarioApellido);
export const errorUsuarioEmail = document.querySelector(selectores.errorUsuarioEmail);
export const errorUsuarioDocumento = document.querySelector(selectores.errorUsuarioDocumento);
export const contenedorUsuarios = document.querySelector(selectores.contenedorUsuarios);
export const contadorUsuarios = document.querySelector(selectores.contadorUsuarios);
export const seccionAdminGlobal = document.querySelector(selectores.seccionAdminGlobal);
export const contenedorTareasAdmin = document.querySelector(selectores.contenedorTareasAdmin);
export const contadorTareasAdmin = document.querySelector(selectores.contadorTareasAdmin);
export const filtroAdminUsuario = document.querySelector(selectores.filtroAdminUsuario);
export const contenedorAsignacion = document.querySelector(selectores.contenedorAsignacion);

// Exportaciones adicionales para referencias directas
export const assignmentGroup = document.querySelector('#assignmentGroup');
export const editandoUsuarioId = estado.editandoUsuarioId;
