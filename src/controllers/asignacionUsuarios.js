import { estado, contenedorAsignacion } from './variables.js';

// Referencia directa al assignment group
const assignmentGroup = document.querySelector('#assignmentGroup');
import { getAllUsers } from '../api/index.js';
import { crearCheckboxUsuario } from '../ui/index.js';

/**
 * Carga los usuarios disponibles y muestra los checkboxes para asignación
 * @param {Array} usuariosSeleccionados - Array de IDs de usuarios ya seleccionados
 */
export async function cargarCheckboxesUsuarios(usuariosSeleccionados = []) {
    try {
        const response = await getAllUsers();
        const usuarios = response.data || response;
        
        // Limpiar contenedor
        while (contenedorAsignacion.firstChild) {
            contenedorAsignacion.removeChild(contenedorAsignacion.firstChild);
        }
        
        if (usuarios.length === 0) {
            const errorMsg = document.createElement('p');
            errorMsg.className = 'task-form__error';
            errorMsg.textContent = 'No hay usuarios disponibles para asignar';
            contenedorAsignacion.appendChild(errorMsg);
            return;
        }

        usuarios.forEach(usuario => {
            const isChecked = usuariosSeleccionados.includes(usuario.id);
            const checkbox = crearCheckboxUsuario(usuario, isChecked);
            contenedorAsignacion.appendChild(checkbox);
        });

        // Actualizar estado
        estado.usuariosSeleccionados = usuariosSeleccionados;
        
    } catch (error) {
        console.error('Error al cargar usuarios para asignación:', error);
        
        const errorMsg = document.createElement('p');
        errorMsg.className = 'task-form__error';
        errorMsg.textContent = 'Error al cargar usuarios';
        contenedorAsignacion.appendChild(errorMsg);
    }
}

/**
 * Muestra u oculta el contenedor de asignación de usuarios
 * @param {boolean} mostrar - Si se debe mostrar el contenedor
 */
export function toggleContenedorAsignacion(mostrar) {
    if (assignmentGroup) {
        assignmentGroup.style.display = mostrar ? 'block' : 'none';
    }
}

/**
 * Obtiene los IDs de los usuarios seleccionados
 * @returns {Array} Array de IDs de usuarios seleccionados
 */
export function obtenerUsuariosSeleccionados() {
    const checkboxes = contenedorAsignacion.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

/**
 * Selecciona o deselecciona todos los usuarios
 * @param {boolean} seleccionar - Si se deben seleccionar todos
 */
export function seleccionarTodosLosUsuarios(seleccionar) {
    const checkboxes = contenedorAsignacion.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = seleccionar;
    });
}

/**
 * Filtra usuarios por texto de búsqueda
 * @param {string} texto - Texto de búsqueda
 */
export function filtrarUsuarios(texto) {
    const checkboxes = contenedorAsignacion.querySelectorAll('.user-checkbox');
    const textoLower = texto.toLowerCase();
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.querySelector('label');
        if (label) {
            const textoLabel = label.textContent.toLowerCase();
            const coincidencia = textoLabel.includes(textoLower);
            checkbox.style.display = coincidencia ? 'flex' : 'none';
        }
    });
}

/**
 * Configura los event listeners para los checkboxes de usuarios
 */
export function configurarEventListenersAsignacion() {
    // Listener para cambios en checkboxes
    contenedorAsignacion.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            estado.usuariosSeleccionados = obtenerUsuariosSeleccionados();
        }
    });
}

/**
 * Valida que al menos un usuario esté seleccionado
 * @returns {boolean} True si hay al menos un usuario seleccionado
 */
export function validarSeleccionUsuarios() {
    const seleccionados = obtenerUsuariosSeleccionados();
    return seleccionados.length > 0;
}

/**
 * Muestra un mensaje de error si no hay usuarios seleccionados
 */
export function mostrarErrorSeleccionUsuarios() {
    const errorExistente = contenedorAsignacion.querySelector('.asignacion-error');
    if (errorExistente) return;

    const errorMensaje = document.createElement('p');
    errorMensaje.className = 'task-form__error asignacion-error';
    errorMensaje.textContent = 'Debes seleccionar al menos un usuario para la tarea';
    
    contenedorAsignacion.appendChild(errorMensaje);
    
    // Remover el error después de 3 segundos
    setTimeout(() => {
        if (errorMensaje.parentNode) {
            errorMensaje.parentNode.removeChild(errorMensaje);
        }
    }, 3000);
}

/**
 * Limpia la selección de usuarios
 */
export function limpiarSeleccionUsuarios() {
    seleccionarTodosLosUsuarios(false);
    estado.usuariosSeleccionados = [];
}
