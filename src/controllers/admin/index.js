// =============================================================================
// CONTROLADOR PRINCIPAL ADMIN - controllers/admin/index.js
// =============================================================================
// Inicializa la vista de administrador: navegación por tabs, dashboard,
// gestión de usuarios, gestión de tareas y asignación múltiple.

import { estado, inicializarReferencias } from './variables.js';
import { inicializarNavbar } from '../../ui/navBar.js';
import { cargarDashboard } from './seccionDashboard.js';
import { cargarUsuarios, configurarEventosUsuarios } from './seccionUsuarios.js';
import { cargarTareas, configurarEventosTareas, llenarFiltroUsuarios } from './seccionTareas.js';
import { configurarEventosAsignacion } from './seccionAsignacion.js';

// =============================================================================
// INICIALIZACIÓN
// =============================================================================
export async function iniciarVistaAdmin() {
    inicializarReferencias();
    inicializarNavbar(estado.usuarioActual);
    configurarNavegacion();
    configurarEventosUsuarios();
    configurarEventosTareas();
    configurarEventosAsignacion();

    // Cargar datos iniciales
    await cargarDashboard();
    await cargarUsuarios();

    // Llenar filtro de usuarios en tareas
    llenarFiltroUsuarios();
}

// =============================================================================
// NAVEGACIÓN POR TABS
// =============================================================================
function configurarNavegacion() {
    const tabs = document.querySelectorAll('.navbar__tab');
    const secciones = {
        dashboard: document.querySelector('#seccionDashboard'),
        usuarios: document.querySelector('#seccionUsuarios'),
        tareas: document.querySelector('#seccionTareas')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            // Actualizar tab activo
            tabs.forEach(t => t.classList.remove('navbar__tab--activo'));
            tab.classList.add('navbar__tab--activo');

            // Ocultar todas las secciones
            Object.values(secciones).forEach(seccion => {
                seccion.classList.add('hidden');
            });

            // Mostrar sección seleccionada
            const seccionId = tab.dataset.seccion;
            secciones[seccionId].classList.remove('hidden');

            // Recargar datos al cambiar de tab
            if (seccionId === 'dashboard') {
                await cargarDashboard();
            } else if (seccionId === 'usuarios') {
                await cargarUsuarios();
            } else if (seccionId === 'tareas') {
                await cargarUsuarios(); // Para los filtros y selector
                llenarFiltroUsuarios();
                await cargarTareas();
            }
        });
    });
}
