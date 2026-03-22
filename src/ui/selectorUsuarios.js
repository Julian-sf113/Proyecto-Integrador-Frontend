// =============================================================================
// COMPONENTE SELECTOR DE USUARIOS - ui/selectorUsuarios.js
// =============================================================================
// Crea un listado de checkboxes para selección múltiple de usuarios.

import { obtenerInicialesUsuario } from '../services/tareas.js';

/**
 * Renderiza checkboxes de usuarios dentro de un contenedor
 * @param {HTMLElement} contenedor - Elemento donde insertar los checkboxes
 * @param {Array} usuarios - Lista de usuarios disponibles
 * @param {Array} seleccionados - IDs de usuarios ya seleccionados
 */
export function renderizarSelectorUsuarios(contenedor, usuarios, seleccionados = []) {
    contenedor.textContent = '';

    if (usuarios.length === 0) {
        const vacio = document.createElement('p');
        vacio.className = 'user-selector__empty';
        vacio.textContent = 'No hay usuarios disponibles';
        contenedor.appendChild(vacio);
        return;
    }

    // Solo mostrar usuarios activos
    const usuariosActivos = usuarios.filter(u => u.status === 'activo');

    usuariosActivos.forEach(usuario => {
        const label = document.createElement('label');
        label.className = 'user-selector__item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'user-selector__checkbox';
        checkbox.value = usuario.id;
        checkbox.name = 'assignedUserIds';

        if (seleccionados.includes(String(usuario.id))) {
            checkbox.checked = true;
        }

        const avatar = document.createElement('span');
        avatar.className = 'user-selector__avatar';
        const nombreCompleto = `${usuario.firstName} ${usuario.lastName}`;
        avatar.textContent = obtenerInicialesUsuario(nombreCompleto);

        const info = document.createElement('span');
        info.className = 'user-selector__info';

        const nombre = document.createElement('span');
        nombre.className = 'user-selector__name';
        nombre.textContent = nombreCompleto;

        const email = document.createElement('span');
        email.className = 'user-selector__email';
        email.textContent = usuario.email;

        info.appendChild(nombre);
        info.appendChild(email);

        label.appendChild(checkbox);
        label.appendChild(avatar);
        label.appendChild(info);

        contenedor.appendChild(label);
    });
}

/**
 * Obtiene los IDs de los usuarios seleccionados
 * @param {HTMLElement} contenedor - El contenedor de checkboxes
 * @returns {string[]} - Array de IDs seleccionados
 */
export function obtenerUsuariosSeleccionados(contenedor) {
    const checkboxes = contenedor.querySelectorAll('.user-selector__checkbox:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}
