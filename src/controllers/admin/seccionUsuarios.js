// =============================================================================
// SECCIÓN USUARIOS - controllers/admin/seccionUsuarios.js
// =============================================================================
// CRUD completo de usuarios para el panel de administración.

import { estado, usersListContainer, userFormContainer, userForm, userFormTitle, btnNuevoUsuario, userFormCancelBtn } from './variables.js';
import { getUsers } from '../../api/users/getUsers.js';
import { createUser } from '../../api/users/createUser.js';
import { updateUser } from '../../api/users/updateUser.js';
import { deleteUser } from '../../api/users/deleteUser.js';
import { patchUserStatus } from '../../api/users/patchUserStatus.js';
import { crearTarjetaUsuario } from '../../ui/tarjetaUsuario.js';
import { notificarExito, notificarError } from '../../utils/notificaciones.js';
import { confirmarEliminacionTarea } from '../../utils/alertas.js';

// =============================================================================
// CARGA DE USUARIOS
// =============================================================================
export async function cargarUsuarios() {
    try {
        estado.usuarios = await getUsers();
        renderizarUsuarios();
    } catch (error) {
        notificarError('Error al cargar usuarios.');
    }
}

function renderizarUsuarios() {
    usersListContainer.textContent = '';

    if (estado.usuarios.length === 0) {
        const vacio = document.createElement('p');
        vacio.className = 'users-list__empty';
        vacio.textContent = 'No hay usuarios registrados.';
        usersListContainer.appendChild(vacio);
        return;
    }

    estado.usuarios.forEach(usuario => {
        const tarjeta = crearTarjetaUsuario(usuario);
        usersListContainer.appendChild(tarjeta);
    });
}

// =============================================================================
// CONFIGURACIÓN DE EVENTOS
// =============================================================================
export function configurarEventosUsuarios() {
    // Botón nuevo usuario
    btnNuevoUsuario.addEventListener('click', () => {
        estado.editandoUsuarioId = null;
        userFormTitle.textContent = 'Registrar Usuario';
        userForm.reset();
        userFormContainer.classList.remove('hidden');
    });

    // Cancelar formulario
    userFormCancelBtn.addEventListener('click', () => {
        userFormContainer.classList.add('hidden');
        userForm.reset();
        estado.editandoUsuarioId = null;
    });

    // Submit formulario
    userForm.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        evento.stopPropagation();

        const datos = {
            firstName: userForm.elements['firstName'].value.trim(),
            lastName: userForm.elements['lastName'].value.trim(),
            email: userForm.elements['email'].value.trim(),
            role: userForm.elements['role'].value,
            status: userForm.elements['status'].value
        };

        const password = userForm.elements['password'].value.trim();
        if (password) {
            datos.password = password;
        }

        // Validación básica
        if (!datos.firstName || !datos.lastName || !datos.email) {
            notificarError('Nombre, apellido y email son obligatorios.');
            return;
        }

        try {
            if (estado.editandoUsuarioId) {
                await updateUser(estado.editandoUsuarioId, datos);
                notificarExito('Usuario actualizado correctamente.');
            } else {
                await createUser(datos);
                notificarExito('Usuario creado correctamente.');
            }

            userFormContainer.classList.add('hidden');
            userForm.reset();
            estado.editandoUsuarioId = null;
            await cargarUsuarios();

        } catch (error) {
            notificarError(error.message);
        }
    });

    // Event delegation para acciones en tarjetas de usuario
    usersListContainer.addEventListener('click', async (evento) => {
        const btnEditar = evento.target.closest('.btn-accion-sm--edit');
        const btnEstado = evento.target.closest('.btn-accion-sm--status');
        const btnEliminar = evento.target.closest('.btn-accion-sm--delete');

        if (btnEditar) {
            const userId = btnEditar.getAttribute('data-id');
            editarUsuario(userId);
        }

        if (btnEstado) {
            const userId = btnEstado.getAttribute('data-id');
            const estadoActual = btnEstado.getAttribute('data-status');
            await toggleEstadoUsuario(userId, estadoActual);
        }

        if (btnEliminar) {
            const userId = btnEliminar.getAttribute('data-id');
            await eliminarUsuario(userId);
        }
    });
}

// =============================================================================
// ACCIONES DE USUARIO
// =============================================================================
function editarUsuario(userId) {
    const usuario = estado.usuarios.find(u => String(u.id) === String(userId));
    if (!usuario) return;

    estado.editandoUsuarioId = userId;
    userFormTitle.textContent = 'Editar Usuario';

    userForm.elements['firstName'].value = usuario.firstName;
    userForm.elements['lastName'].value = usuario.lastName;
    userForm.elements['email'].value = usuario.email;
    userForm.elements['role'].value = usuario.role;
    userForm.elements['status'].value = usuario.status;
    userForm.elements['password'].value = '';

    userFormContainer.classList.remove('hidden');
}

async function toggleEstadoUsuario(userId, estadoActual) {
    const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';

    try {
        await patchUserStatus(userId, nuevoEstado);
        notificarExito(`Usuario ${nuevoEstado === 'activo' ? 'activado' : 'desactivado'}.`);
        await cargarUsuarios();
    } catch (error) {
        notificarError(error.message);
    }
}

async function eliminarUsuario(userId) {
    const confirmado = await confirmarEliminacionTarea();
    if (!confirmado) return;

    try {
        await deleteUser(userId);
        notificarExito('Usuario eliminado correctamente.');
        await cargarUsuarios();
    } catch (error) {
        notificarError(error.message);
    }
}
