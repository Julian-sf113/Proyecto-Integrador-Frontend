// =============================================================================
// COMPONENTE TARJETA DE USUARIO - ui/tarjetaUsuario.js
// =============================================================================
// Crea tarjetas de usuario para el panel de administración.

import { obtenerInicialesUsuario } from '../services/tareas.js';

/**
 * Crea una tarjeta de usuario como elemento DOM
 * @param {Object} usuario - Datos del usuario
 */
export function crearTarjetaUsuario(usuario) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'user-card';
    tarjeta.setAttribute('data-user-id', usuario.id);

    // Header con avatar y nombre
    const header = document.createElement('div');
    header.className = 'user-card__header';

    const avatar = document.createElement('div');
    avatar.className = 'user-card__avatar';
    const nombreCompleto = `${usuario.firstName} ${usuario.lastName}`;
    avatar.textContent = obtenerInicialesUsuario(nombreCompleto);

    const info = document.createElement('div');
    info.className = 'user-card__info';

    const nombre = document.createElement('span');
    nombre.className = 'user-card__name';
    nombre.textContent = nombreCompleto;

    const email = document.createElement('span');
    email.className = 'user-card__email';
    email.textContent = usuario.email;

    info.appendChild(nombre);
    info.appendChild(email);

    header.appendChild(avatar);
    header.appendChild(info);

    // Badges
    const badges = document.createElement('div');
    badges.className = 'user-card__badges';

    const badgeRol = document.createElement('span');
    badgeRol.className = `user-card__badge user-card__badge--${usuario.role}`;
    badgeRol.textContent = usuario.role === 'admin' ? 'Admin' : 'Usuario';

    const badgeEstado = document.createElement('span');
    badgeEstado.className = `user-card__badge user-card__badge--${usuario.status}`;
    badgeEstado.textContent = usuario.status.charAt(0).toUpperCase() + usuario.status.slice(1);

    badges.appendChild(badgeRol);
    badges.appendChild(badgeEstado);

    // Acciones
    const acciones = document.createElement('div');
    acciones.className = 'user-card__actions';

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn-accion-sm btn-accion-sm--edit';
    btnEditar.setAttribute('data-id', usuario.id);
    const iconoEditar = document.createElement('i');
    iconoEditar.classList.add('fa-solid', 'fa-pen');
    btnEditar.appendChild(iconoEditar);
    const textoEditar = document.createTextNode(' Editar');
    btnEditar.appendChild(textoEditar);

    const btnEstado = document.createElement('button');
    btnEstado.className = 'btn-accion-sm btn-accion-sm--status';
    btnEstado.setAttribute('data-id', usuario.id);
    btnEstado.setAttribute('data-status', usuario.status);
    const iconoEstado = document.createElement('i');
    iconoEstado.classList.add('fa-solid', usuario.status === 'activo' ? 'fa-ban' : 'fa-check');
    btnEstado.appendChild(iconoEstado);
    const textoEstado = document.createTextNode(usuario.status === 'activo' ? ' Desactivar' : ' Activar');
    btnEstado.appendChild(textoEstado);

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-accion-sm btn-accion-sm--delete';
    btnEliminar.setAttribute('data-id', usuario.id);
    const iconoEliminar = document.createElement('i');
    iconoEliminar.classList.add('fa-solid', 'fa-trash');
    btnEliminar.appendChild(iconoEliminar);

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEstado);
    acciones.appendChild(btnEliminar);

    tarjeta.appendChild(header);
    tarjeta.appendChild(badges);
    tarjeta.appendChild(acciones);

    return tarjeta;
}
