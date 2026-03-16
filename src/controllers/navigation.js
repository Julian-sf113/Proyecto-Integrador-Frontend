import { estado } from './variables.js';

/**
 * Cambia entre las diferentes vistas de la aplicación
 * @param {string} vista - Nombre de la vista a mostrar ('usuario', 'administracion', 'admin-global')
 */
export function cambiarVista(vista) {
    // Ocultar todas las vistas
    document.querySelectorAll('.vista').forEach(v => {
        v.style.display = 'none';
    });

    // Mostrar la vista seleccionada
    const vistaElement = document.getElementById(`vista${vista.charAt(0).toUpperCase() + vista.slice(1)}`);
    if (vistaElement) {
        vistaElement.style.display = 'block';
    }

    // Actualizar estado
    estado.vistaActual = vista;

    // Actualizar navegación
    actualizarNavegacion(vista);
}

/**
 * Actualiza el estado visual de la navegación
 * @param {string} vistaActiva - Vista actualmente activa
 */
function actualizarNavegacion(vistaActiva) {
    document.querySelectorAll('.nav__btn').forEach(btn => {
        btn.classList.remove('nav__btn--active');
        if (btn.dataset.vista === vistaActiva) {
            btn.classList.add('nav__btn--active');
        }
    });
}

/**
 * Muestra la navegación principal
 */
export function mostrarNavegacion() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.style.display = 'flex';
    }
}

/**
 * Oculta la navegación principal
 */
export function ocultarNavegacion() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.style.display = 'none';
    }
}

/**
 * Actualiza la información del usuario en la navegación
 * @param {Object} usuario - Datos del usuario
 */
export function actualizarInfoUsuario(usuario) {
    const userInfo = document.getElementById('navUserInfo');
    if (userInfo && usuario) {
        userInfo.textContent = `Usuario: ${usuario.firstName} ${usuario.lastName}`;
    }
}

/**
 * Configura los event listeners de la navegación
 */
export function configurarNavegacion() {
    // Botones de navegación
    document.querySelectorAll('.nav__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const vista = btn.dataset.vista;
            cambiarVista(vista);
        });
    });

    // Botón de logout
    const logoutBtn = document.getElementById('btnLogout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Resetear estado
            estado.usuarioActual = null;
            estado.esAdministrador = false;
            estado.vistaActual = 'usuario';
            
            // Ocultar navegación y mostrar vista inicial
            ocultarNavegacion();
            cambiarVista('usuario');
            
            // Limpiar formularios
            limpiarFormularios();
            
            // Recargar página para resetear todo
            window.location.reload();
        });
    }
}

/**
 * Limpia todos los formularios del sistema
 */
function limpiarFormularios() {
    // Limpiar formulario de búsqueda
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.reset();
    }

    // Limpiar formulario de tareas
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.reset();
    }

    // Limpiar formulario de usuarios
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.reset();
    }
}
