import { 
    estado, 
    formularioUsuario, 
    inputUsuarioNombre, 
    inputUsuarioApellido, 
    inputUsuarioEmail, 
    inputUsuarioDocumento,
    botonGuardarUsuario,
    errorUsuarioNombre,
    errorUsuarioApellido,
    errorUsuarioEmail,
    errorUsuarioDocumento,
    contenedorUsuarios,
    contadorUsuarios
} from './variables.js';

import { reglasUsuario } from '../config/index.js';
import { validar } from '../utils/index.js';
import { getAllUsers, createUser, updateUser, deleteUser } from '../api/index.js';
import { crearTarjetaUsuario } from '../ui/index.js';
import { notificarExito, notificarError, confirmarEliminacionUsuario } from '../utils/index.js';

/**
 * Carga todos los usuarios desde la API y los muestra en la lista
 */
export async function cargarUsuarios() {
    try {
        const response = await getAllUsers();
        estado.usuarios = response.data || response;
        
        renderizarUsuarios();
        actualizarContadorUsuarios();
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        notificarError('No se pudieron cargar los usuarios');
    }
}

/**
 * Renderiza la lista de usuarios en el DOM
 */
function renderizarUsuarios() {
    // Limpiar contenedor
    while (contenedorUsuarios.firstChild) {
        contenedorUsuarios.removeChild(contenedorUsuarios.firstChild);
    }
    
    if (estado.usuarios.length === 0) {
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
        
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2');
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '7');
        circle.setAttribute('r', '4');
        
        svg.appendChild(path1);
        svg.appendChild(circle);
        
        const title = document.createElement('p');
        title.className = 'tasks-empty__text';
        title.textContent = 'No hay usuarios registrados';
        
        const subtitle = document.createElement('p');
        subtitle.className = 'tasks-empty__subtext';
        subtitle.textContent = 'Completa el formulario para agregar tu primer usuario';
        
        emptyState.appendChild(svg);
        emptyState.appendChild(title);
        emptyState.appendChild(subtitle);
        contenedorUsuarios.appendChild(emptyState);
        return;
    }

    estado.usuarios.forEach(usuario => {
        const tarjeta = crearTarjetaUsuario(usuario);
        contenedorUsuarios.appendChild(tarjeta);
    });
}

/**
 * Actualiza el contador de usuarios
 */
function actualizarContadorUsuarios() {
    const count = estado.usuarios.length;
    contadorUsuarios.textContent = `${count} usuario${count !== 1 ? 's' : ''}`;
}

/**
 * Limpia el formulario de usuarios
 */
export function limpiarFormularioUsuario() {
    formularioUsuario.reset();
    estado.editandoUsuarioId = null;
    
    // Limpiar errores
    errorUsuarioNombre.textContent = '';
    errorUsuarioApellido.textContent = '';
    errorUsuarioEmail.textContent = '';
    errorUsuarioDocumento.textContent = '';
    
    // Quitar clases de error
    inputUsuarioNombre.classList.remove('error');
    inputUsuarioApellido.classList.remove('error');
    inputUsuarioEmail.classList.remove('error');
    inputUsuarioDocumento.classList.remove('error');
    
    // Actualizar título del formulario
    const formTitle = document.getElementById('userFormTitle');
    const saveBtnText = document.getElementById('saveUserBtnText');
    if (formTitle) formTitle.textContent = 'Nuevo Usuario';
    if (saveBtnText) saveBtnText.textContent = 'Guardar Usuario';
}

/**
 * Carga un usuario en el formulario para edición
 * @param {string} userId - ID del usuario a editar
 */
export function cargarUsuarioEnFormulario(userId) {
    const usuario = estado.usuarios.find(u => u.id === userId);
    if (!usuario) return;

    estado.editandoUsuarioId = userId;
    
    inputUsuarioNombre.value = usuario.firstName;
    inputUsuarioApellido.value = usuario.lastName;
    inputUsuarioEmail.value = usuario.email;
    inputUsuarioDocumento.value = usuario.id;

    // Actualizar título del formulario
    const formTitle = document.getElementById('userFormTitle');
    const saveBtnText = document.getElementById('saveUserBtnText');
    if (formTitle) formTitle.textContent = 'Editar Usuario';
    if (saveBtnText) saveBtnText.textContent = 'Actualizar Usuario';

    // Scroll al formulario
    formularioUsuario.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Elimina un usuario
 * @param {string} userId - ID del usuario a eliminar
 */
export async function eliminarUsuario(userId) {
    try {
        await deleteUser(userId);
        
        // Eliminar del estado
        estado.usuarios = estado.usuarios.filter(u => u.id !== userId);
        
        renderizarUsuarios();
        actualizarContadorUsuarios();
        
        notificarExito('Usuario eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        notificarError('No se pudo eliminar el usuario');
    }
}

/**
 * Guarda un usuario (crea o actualiza)
 */
export async function guardarUsuario() {
    // Limpiar errores previos
    limpiarErroresUsuario();

    // Validar formulario
    const { valido, errores } = validar(formularioUsuario, reglasUsuario);

    if (!valido) {
        mostrarErroresUsuario(errores);
        return;
    }

    const userData = {
        firstName: inputUsuarioNombre.value.trim(),
        lastName: inputUsuarioApellido.value.trim(),
        email: inputUsuarioEmail.value.trim(),
        documentId: inputUsuarioDocumento.value.trim()
    };

    try {
        if (estado.editandoUsuarioId) {
            // Actualizar usuario existente
            await updateUser(estado.editandoUsuarioId, userData);
            
            // Actualizar en el estado
            const index = estado.usuarios.findIndex(u => u.id === estado.editandoUsuarioId);
            if (index !== -1) {
                estado.usuarios[index] = { ...estado.usuarios[index], ...userData };
            }
            
            notificarExito('Usuario actualizado correctamente');
        } else {
            // Crear nuevo usuario
            const response = await createUser(userData);
            estado.usuarios.push(response.data || response);
            
            notificarExito('Usuario creado correctamente');
        }

        limpiarFormularioUsuario();
        renderizarUsuarios();
        actualizarContadorUsuarios();
        
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        notificarError('No se pudo guardar el usuario');
    }
}

/**
 * Limpia los mensajes de error del formulario
 */
function limpiarErroresUsuario() {
    errorUsuarioNombre.textContent = '';
    errorUsuarioApellido.textContent = '';
    errorUsuarioEmail.textContent = '';
    errorUsuarioDocumento.textContent = '';
    
    inputUsuarioNombre.classList.remove('error');
    inputUsuarioApellido.classList.remove('error');
    inputUsuarioEmail.classList.remove('error');
    inputUsuarioDocumento.classList.remove('error');
}

/**
 * Muestra los errores de validación en el formulario
 * @param {Object} errores - Objeto con los errores de validación
 */
function mostrarErroresUsuario(errores) {
    if (errores.firstName) {
        inputUsuarioNombre.classList.add('error');
        errorUsuarioNombre.textContent = errores.firstName;
    }
    if (errores.lastName) {
        inputUsuarioApellido.classList.add('error');
        errorUsuarioApellido.textContent = errores.lastName;
    }
    if (errores.email) {
        inputUsuarioEmail.classList.add('error');
        errorUsuarioEmail.textContent = errores.email;
    }
    if (errores.documentId) {
        inputUsuarioDocumento.classList.add('error');
        errorUsuarioDocumento.textContent = errores.documentId;
    }
}
