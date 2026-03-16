// =============================================================================
// CONTROLADOR PRINCIPAL DE LA APLICACIÓN - controllers/index.js
// =============================================================================
// Este archivo contiene la función principal que inicializa toda la aplicación.
// Configura todos los event listeners y maneja la lógica principal de la UI.

// Importación de todas las variables y selectores del DOM
import {
    formularioBusqueda, inputDocumento, errorDocumento, formularioTarea, inputTituloTarea,
    inputEstadoTarea, inputDescripcionTarea, botonGuardarTarea, errorTituloTarea,
    errorEstadoTarea, errorDescripcionTarea, contenedorTareas,
    contadorTareas, seccionFormularioTarea, seccionListaTareas, modalOverlay,
    modalContent, estado
} from './variables.js';

// Importación de configuración y reglas de validación
import { urlAPI, reglasBusqueda, reglasTarea } from '../config/index.js';

// Importación de funciones de interfaz de usuario
import { actualizarContador, ocultarSeccionesInferiores, mostrarSeccionesInferiores, cerrarModalFeedback, mostrarModalFeedback } from './funcionesUI.js';

// Importación de funciones de manejo de formularios
import { limpiarFormularioDeTarea, cargarTareaEnFormulario } from './funcionesFormulario.js';

// Importación de funciones de manejo de tareas
import { eliminarTarea, pintarTareaEnDOM, agregarTareaAlEstado } from './funcionesTareas.js';

// Importación de funciones de API
import { getOneUser, getTasks, createTask, deleteTask, patchTask, assignUsersToTask, getAllTasks } from '../api/index.js';

// Importación de servicios de utilidad
import { obtenerClaseEstado, obtenerEtiquetaEstado, obtenerTextoFechaHoraActual, obtenerInicialesUsuario } from '../services/index.js';

// Importación de funciones de validación
import { validar } from '../utils/index.js';

// Importación de componentes de UI
import { crearTarjetaTarea, crearEmptyState } from '../ui/index.js';

// RF01/RF02: Importación del módulo de filtros y ordenamiento
import { aplicarFiltrosYOrden, resetearFiltros } from './funcionesFiltros.js';

// RF03: Importación del módulo de notificaciones desde utils (independiente del módulo API)
import { notificarExito, notificarError, notificarInfo, confirmarEliminacionTarea } from '../utils/index.js';

// RF04: Importación del servicio de exportación (solo procesamiento de datos)
import { exportarTareasJSON } from '../services/exportar.js';

// Nuevas importaciones para funcionalidades administrativas
import { cambiarVista, mostrarNavegacion, actualizarInfoUsuario, configurarNavegacion } from './navigation.js';
import { cargarUsuarios, guardarUsuario, limpiarFormularioUsuario, cargarUsuarioEnFormulario, eliminarUsuario } from './adminUsuarios.js';
import { cargarCheckboxesUsuarios, toggleContenedorAsignacion, obtenerUsuariosSeleccionados, validarSeleccionUsuarios, mostrarErrorSeleccionUsuarios, configurarEventListenersAsignacion } from './asignacionUsuarios.js';

// =============================================================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// =============================================================================

/**
 * Inicializa toda la aplicación.
 * Configura los formularios, establece los event listeners
 * y prepara la interfaz para su uso.
 */
export function iniciarAplicacion() {
    // Inicializa el estado de la UI
    ocultarSeccionesInferiores();
    actualizarContador();

    // Configurar navegación
    configurarNavegacion();
    configurarEventListenersAsignacion();

    // Previene el comportamiento por defecto de los formularios
    formularioBusqueda.setAttribute('onsubmit', 'return false;');
    formularioTarea.setAttribute('onsubmit', 'return false;');

    // Configurar formulario de usuarios si existe
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.setAttribute('onsubmit', 'return false;');
    }

    // =============================================================================
    // EVENT LISTENER: BÚSQUEDA DE USUARIO
    // =============================================================================
    formularioBusqueda.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        // Limpia estados previos
        errorDocumento.textContent = '';
        inputDocumento.classList.remove('error');
        cerrarModalFeedback();

        // Valida el formulario de búsqueda
        const { valido, errores } = validar(formularioBusqueda, reglasBusqueda);

        if (!valido) {
            inputDocumento.classList.add('error');
            errorDocumento.textContent = errores.documento || 'Dato inválido.';
            estado.usuarioActual = null;
            ocultarSeccionesInferiores();
            limpiarFormularioDeTarea();

            mostrarModalFeedback(
                'error',
                'Error de Búsqueda',
                errores.documento || 'Dato inválido.',
                'Por favor verifique el campo e intente nuevamente.'
            );
            return;
        }

        const documento = inputDocumento.value.trim();

        try {
            const usuario = await getOneUser(documento);

            // Usuario encontrado: resetear estado completo
            estado.usuarioActual = usuario;
            estado.totalTareas = 0;
            estado.tareas = [];
            
            // Determinar si es administrador (por ahora, todos pueden acceder a admin)
            estado.esAdministrador = true;

            // RF01/RF02: Reiniciar filtros y controles visuales
            resetearFiltros();

            // Mostrar navegación y actualizar info
            mostrarNavegacion();
            actualizarInfoUsuario(usuario);
            
            // Cambiar a vista de usuario
            cambiarVista('usuario');

            // Limpiar contenedor
            while (contenedorTareas.firstChild) {
                contenedorTareas.removeChild(contenedorTareas.firstChild);
            }
            const emptyState = crearEmptyState();
            contenedorTareas.appendChild(emptyState);
            mostrarSeccionesInferiores();
            actualizarContador();
            inputTituloTarea.focus();

            // Cargar checkboxes de usuarios para asignación (solo para administradores)
            if (estado.esAdministrador) {
                await cargarCheckboxesUsuarios();
                toggleContenedorAsignacion(true);
            }

            // Cargar tareas existentes del usuario (carga por lotes)
            try {
                const tareas = await getTasks(usuario.id);

                if (tareas && tareas.length > 0) {
                    // Cargar todas las tareas en estado sin re-renderizar en cada iteración
                    for (const tarea of tareas) {
                        agregarTareaAlEstado(tarea);
                    }
                    actualizarContador();
                    // Renderizar una sola vez con filtros y orden por defecto
                    aplicarFiltrosYOrden();
                }
            } catch (error) {
                console.error('Error al cargar las tareas:', error);
            }

            mostrarModalFeedback(
                'success',
                'Usuario Verificado',
                [
                    { etiqueta: 'Nombre:', valor: `${usuario.firstName} ${usuario.lastName}` },
                    { etiqueta: 'Email:', valor: usuario.email }
                ]
            );
        } catch {
            estado.usuarioActual = null;
            inputDocumento.classList.add('error');
            ocultarSeccionesInferiores();
            limpiarFormularioDeTarea();

            mostrarModalFeedback(
                'error',
                'Usuario No Encontrado',
                'El número de documento ingresado no corresponde a ningún usuario registrado.',
                'Verifique el número de documento e intente nuevamente.'
            );
        }
    });

    // =============================================================================
    // EVENT LISTENER: FORMULARIO DE TAREAS
    // =============================================================================
    formularioTarea.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        evento.stopPropagation();

        // Limpia estados de error previos
        inputTituloTarea.classList.remove('error');
        inputEstadoTarea.classList.remove('error');
        inputDescripcionTarea.classList.remove('error');
        errorTituloTarea.textContent = '';
        errorEstadoTarea.textContent = '';
        errorDescripcionTarea.textContent = '';

        // Valida el formulario de tarea
        const { valido, errores } = validar(formularioTarea, reglasTarea);

        if (!valido) {
            if (errores.titulo) {
                inputTituloTarea.classList.add('error');
                errorTituloTarea.textContent = errores.titulo;
            }
            if (errores.estado) {
                inputEstadoTarea.classList.add('error');
                errorEstadoTarea.textContent = errores.estado;
            }
            if (errores.descripcion) {
                inputDescripcionTarea.classList.add('error');
                errorDescripcionTarea.textContent = errores.descripcion;
            }
            return;
        }

        if (estado.editandoId) {
            // MODO EDICIÓN: Actualiza tarea existente
            try {
                await patchTask(estado.editandoId, {
                    title: inputTituloTarea.value.trim(),
                    body: inputDescripcionTarea.value.trim(),
                    status: inputEstadoTarea.value
                });

                // Actualizar la tarea en estado.tareas (fuente de verdad)
                const idx = estado.tareas.findIndex(
                    (t) => String(t.id) === String(estado.editandoId)
                );
                if (idx !== -1) {
                    estado.tareas[idx] = {
                        ...estado.tareas[idx],
                        title: inputTituloTarea.value.trim(),
                        body: inputDescripcionTarea.value.trim(),
                        status: inputEstadoTarea.value
                    };
                }

                // Limpiar formulario primero (libera el btn-eliminar del card anterior)
                limpiarFormularioDeTarea();

                // Re-renderizar respetando filtros y orden activos (RF01/RF02)
                aplicarFiltrosYOrden();

                // RF03: Notificación de éxito
                notificarExito('La tarea ha sido actualizada correctamente.');
            } catch (error) {
                console.error('Error al actualizar la tarea:', error);
                // RF03: Notificación de error
                notificarError('No se pudo actualizar la tarea. Verifique la conexión con el servidor.');
            }
        } else {
            // MODO CREACIÓN: Crea nueva tarea
            try {
                const usuariosSeleccionados = estado.esAdministrador ? obtenerUsuariosSeleccionados() : [estado.usuarioActual.id];
                
                // Validar que se hayan seleccionado usuarios (solo para administradores)
                if (estado.esAdministrador && !validarSeleccionUsuarios()) {
                    mostrarErrorSeleccionUsuarios();
                    return;
                }

                const nuevaTarea = await createTask({
                    userId: estado.usuarioActual.id,
                    title: inputTituloTarea.value.trim(),
                    body: inputDescripcionTarea.value.trim(),
                    status: inputEstadoTarea.value,
                    assignedUserIds: usuariosSeleccionados
                });

                // Si hay múltiples usuarios asignados y es administrador, asignarlos a la tarea
                if (estado.esAdministrador && usuariosSeleccionados.length > 1) {
                    try {
                        await assignUsersToTask(nuevaTarea.id, usuariosSeleccionados);
                        // Actualizar la tarea con las asignaciones
                        nuevaTarea.assignedUserIds = usuariosSeleccionados;
                    } catch (assignError) {
                        console.error('Error al asignar usuarios:', assignError);
                        notificarError('La tarea se creó pero hubo un error al asignar usuarios');
                    }
                }

                // pintarTareaEnDOM agrega a estado.tareas y re-renderiza con filtros activos
                pintarTareaEnDOM(nuevaTarea);
                limpiarFormularioDeTarea();
                inputTituloTarea.focus();

                // RF03: Notificación de éxito
                notificarExito('¡Tarea agregada correctamente!');
            } catch (error) {
                console.error('Error al crear la tarea:', error);
                // RF03: Notificación de error
                notificarError('Error al guardar la tarea. Verifique la conexión con el servidor.');
            }
        }
    });

    // =============================================================================
    // EVENT LISTENER: CLICKS EN CONTENEDOR DE TAREAS
    // =============================================================================
    contenedorTareas.addEventListener('click', async (evento) => {
        const btnEditar = evento.target.closest('.btn-editar');

        if (btnEditar) {
            const id = btnEditar.getAttribute('data-id');
            const card = btnEditar.closest('.message-card');
            estado.editandoId = id;
            cargarTareaEnFormulario(card);
            return;
        }

        const btnEliminar = evento.target.closest('.btn-eliminar');

        if (btnEliminar) {
            const confirmado = await confirmarEliminacionTarea();
            if (!confirmado) return;

            const id = btnEliminar.getAttribute('data-id');
            const card = btnEliminar.closest('.message-card');
            await eliminarTarea(id, card);

            // RF03: Notificación tras eliminar
            notificarInfo('Tarea eliminada.');
        }
    });

    // =============================================================================
    // EVENT LISTENERS: LIMPIEZA DE ERRORES
    // =============================================================================

    inputDocumento.addEventListener('input', () => {
        errorDocumento.textContent = '';
    });

    inputTituloTarea.addEventListener('input', () => {
        errorTituloTarea.textContent = '';
        inputTituloTarea.classList.remove('error');
    });

    inputEstadoTarea.addEventListener('change', () => {
        errorEstadoTarea.textContent = '';
        inputEstadoTarea.classList.remove('error');
    });

    inputDescripcionTarea.addEventListener('input', () => {
        errorDescripcionTarea.textContent = '';
        inputDescripcionTarea.classList.remove('error');
    });

    // =============================================================================
    // RF01: EVENT LISTENERS – FILTROS POR ESTADO
    // =============================================================================
    const filtroEstadoBotones = document.getElementById('filtroEstadoBotones');
    if (filtroEstadoBotones) {
        filtroEstadoBotones.addEventListener('click', (evento) => {
            const btn = evento.target.closest('.btn-filtro');
            if (!btn) return;

            // Actualizar estado visual de botones
            filtroEstadoBotones.querySelectorAll('.btn-filtro').forEach((b) =>
                b.classList.remove('btn-filtro--activo')
            );
            btn.classList.add('btn-filtro--activo');

            // Actualizar estado y re-renderizar
            estado.filtros.estado = btn.dataset.estado;
            aplicarFiltrosYOrden();
        });
    }

    // =============================================================================
    // RF01: EVENT LISTENER – FILTRO POR USUARIO / TÍTULO
    // =============================================================================
    const filtroUsuario = document.getElementById('filtroUsuario');
    if (filtroUsuario) {
        filtroUsuario.addEventListener('input', (evento) => {
            estado.filtros.texto = evento.target.value.trim();
            aplicarFiltrosYOrden();
        });
    }

    // =============================================================================
    // RF02: EVENT LISTENER – CAMBIO DE CAMPO DE ORDEN
    // =============================================================================
    const ordenCampo = document.getElementById('ordenCampo');
    if (ordenCampo) {
        ordenCampo.addEventListener('change', (evento) => {
            estado.ordenamiento.campo = evento.target.value;
            aplicarFiltrosYOrden();
        });
    }

    // =============================================================================
    // RF02: EVENT LISTENER – CAMBIO DE DIRECCIÓN DE ORDEN
    // =============================================================================
    const ordenDireccion = document.getElementById('ordenDireccion');
    if (ordenDireccion) {
        ordenDireccion.addEventListener('click', () => {
            const nueva = estado.ordenamiento.direccion === 'asc' ? 'desc' : 'asc';
            estado.ordenamiento.direccion = nueva;
            ordenDireccion.dataset.direccion = nueva;

            // Actualizar icono según dirección
            const icono = ordenDireccion.querySelector('i');
            if (icono) {
                icono.className = nueva === 'asc'
                    ? 'fa-solid fa-sort-up'
                    : 'fa-solid fa-sort-down';
            }

            aplicarFiltrosYOrden();
        });
    }

    // =============================================================================
    // RF04: EVENT LISTENER – EXPORTAR TAREAS A JSON
    // =============================================================================
    const exportarBtn = document.getElementById('exportarBtn');
    if (exportarBtn) {
        exportarBtn.addEventListener('click', () => {
            // Exportar solo las tareas visibles (filtradas y ordenadas)
            const tareasAExportar = estado.tareasVisibles.length > 0
                ? estado.tareasVisibles
                : estado.tareas;

            if (tareasAExportar.length === 0) {
                notificarInfo('No hay tareas visibles para exportar.');
                return;
            }

            // Procesamiento de datos: responsabilidad de services/exportar.js
            const json = exportarTareasJSON(tareasAExportar);

            // Descarga: responsabilidad del controlador (UI)
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const enlace = document.createElement('a');
            enlace.href = url;
            enlace.download = `tareas-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);
            URL.revokeObjectURL(url);

            // RF03: Notificación de la acción
            notificarExito(`${tareasAExportar.length} tarea(s) exportadas correctamente.`);
        });
    }

    // =============================================================================
    // EVENT LISTENERS: ADMINISTRACIÓN DE USUARIOS
    // =============================================================================
    const userFormElement = document.getElementById('userForm');
    const botonGuardarUsuario = document.getElementById('saveUserBtn');
    const contenedorUsuarios = document.getElementById('usersContainer');

    if (userFormElement && botonGuardarUsuario) {
        userFormElement.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            await guardarUsuario();
        });
    }

    if (contenedorUsuarios) {
        contenedorUsuarios.addEventListener('click', async (evento) => {
            const btnEditar = evento.target.closest('.user-card__btn--edit');
            if (btnEditar) {
                const userId = btnEditar.dataset.id;
                await cargarUsuarioEnFormulario(userId);
                return;
            }

            const btnEliminar = evento.target.closest('.user-card__btn--delete');
            if (btnEliminar) {
                const userId = btnEliminar.dataset.id;
                const confirmado = await confirmarEliminacionUsuario();
                if (confirmado) {
                    await eliminarUsuario(userId);
                }
            }
        });
    }

    // =============================================================================
    // EVENT LISTENERS: PANEL ADMINISTRATIVO GLOBAL
    // =============================================================================
    const filtroAdminUsuario = document.getElementById('adminUserFilter');
    if (filtroAdminUsuario) {
        filtroAdminUsuario.addEventListener('change', async (evento) => {
            const userId = evento.target.value;
            await cargarTareasAdminGlobal(userId);
        });
    }

    // Cargar datos iniciales para vistas administrativas
    document.addEventListener('DOMContentLoaded', async () => {
        // Cargar usuarios cuando se accede a la vista de administración
        const btnVistaAdministracion = document.getElementById('btnVistaAdministracion');
        if (btnVistaAdministracion) {
            btnVistaAdministracion.addEventListener('click', async () => {
                await cargarUsuarios();
            });
        }

        // Cargar todas las tareas cuando se accede al panel global
        const btnVistaAdminGlobal = document.getElementById('btnVistaAdminGlobal');
        if (btnVistaAdminGlobal) {
            btnVistaAdminGlobal.addEventListener('click', async () => {
                await cargarTareasAdminGlobal();
                await cargarOpcionesFiltroUsuarios();
            });
        }
    });
}

// =============================================================================
// FUNCIONES AUXILIARES PARA PANEL ADMINISTRATIVO
// =============================================================================

/**
 * Carga todas las tareas para el panel administrativo global
 * @param {string} userId - ID del usuario para filtrar (opcional)
 */
async function cargarTareasAdminGlobal(userId = null) {
    try {
        const contenedorAdmin = document.getElementById('adminTasksContainer');
        const contadorAdmin = document.getElementById('adminTasksCount');
        
        if (!contenedorAdmin || !contadorAdmin) return;

        let tareas;
        if (userId) {
            // Filtrar por usuario específico
            const response = await filterTasks({ userId });
            tareas = response.data || response;
        } else {
            // Cargar todas las tareas
            const response = await getAllTasks();
            tareas = response.data || response;
        }

        estado.todasLasTareas = tareas;
        
        // Renderizar tareas
        // Limpiar contenedor
        while (contenedorAdmin.firstChild) {
            contenedorAdmin.removeChild(contenedorAdmin.firstChild);
        }
        
        if (tareas.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'tasks-empty';
            
            // Crear SVG
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'tasks-empty__icon');
            svg.setAttribute('width', '64');
            svg.setAttribute('height', '64');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z');
            
            svg.appendChild(path);
            
            const title = document.createElement('p');
            title.className = 'tasks-empty__text';
            title.textContent = 'No hay tareas para mostrar';
            
            const subtitle = document.createElement('p');
            subtitle.className = 'tasks-empty__subtext';
            subtitle.textContent = userId ? 'Este usuario no tiene tareas asignadas' : 'No hay tareas en el sistema';
            
            emptyState.appendChild(svg);
            emptyState.appendChild(title);
            emptyState.appendChild(subtitle);
            contenedorAdmin.appendChild(emptyState);
        } else {
            tareas.forEach(tarea => {
                const tarjeta = crearTarjetaTarea(tarea, true); // true para modo admin
                contenedorAdmin.appendChild(tarjeta);
            });
        }

        contadorAdmin.textContent = `${tareas.length} tarea${tareas.length !== 1 ? 's' : ''}`;
        
    } catch (error) {
        console.error('Error al cargar tareas administrativas:', error);
        notificarError('No se pudieron cargar las tareas');
    }
}

/**
 * Carga las opciones de usuarios para el filtro administrativo
 */
async function cargarOpcionesFiltroUsuarios() {
    try {
        const filtroAdmin = document.getElementById('adminUserFilter');
        if (!filtroAdmin) return;

        const response = await getAllUsers();
        const usuarios = response.data || response;
        
        // Limpiar opciones existentes (excepto la primera)
        while (filtroAdmin.firstChild) {
            filtroAdmin.removeChild(filtroAdmin.firstChild);
        }
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Todos los usuarios';
        filtroAdmin.appendChild(defaultOption);
        
        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id;
            option.textContent = `${usuario.firstName} ${usuario.lastName} (${usuario.id})`;
            filtroAdmin.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error al cargar opciones de filtro:', error);
    }
}
