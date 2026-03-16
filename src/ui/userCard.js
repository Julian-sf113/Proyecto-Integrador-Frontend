import { obtenerInicialesUsuario } from '../services/index.js';

/**
 * Crea una tarjeta de usuario para mostrar en la lista de usuarios
 * @param {Object} usuario - Datos del usuario
 * @returns {HTMLElement} Elemento DOM de la tarjeta de usuario
 */
export function crearTarjetaUsuario(usuario) {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.dataset.userId = usuario.id;

    const header = document.createElement('div');
    header.className = 'user-card__header';

    const info = document.createElement('div');
    info.className = 'user-card__info';

    const name = document.createElement('h3');
    name.className = 'user-card__name';
    name.textContent = `${usuario.firstName} ${usuario.lastName}`;

    const email = document.createElement('p');
    email.className = 'user-card__email';
    email.textContent = usuario.email;

    const document = document.createElement('p');
    document.className = 'user-card__document';
    document.textContent = `Documento: ${usuario.id}`;

    info.appendChild(name);
    info.appendChild(email);
    info.appendChild(document);

    const actions = document.createElement('div');
    actions.className = 'user-card__actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'user-card__btn user-card__btn--edit';
    editBtn.dataset.id = usuario.id;
    editBtn.title = 'Editar usuario';
    
    const editIcon = document.createElement('i');
    editIcon.className = 'fa-solid fa-edit';
    editBtn.appendChild(editIcon);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'user-card__btn user-card__btn--delete';
    deleteBtn.dataset.id = usuario.id;
    deleteBtn.title = 'Eliminar usuario';
    
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-solid fa-trash';
    deleteBtn.appendChild(deleteIcon);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    header.appendChild(info);
    header.appendChild(actions);
    card.appendChild(header);

    return card;
}

/**
 * Crea un checkbox para asignación de usuarios a tareas
 * @param {Object} usuario - Datos del usuario
 * @param {boolean} checked - Si debe estar marcado por defecto
 * @returns {HTMLElement} Elemento DOM del checkbox
 */
export function crearCheckboxUsuario(usuario, checked = false) {
    const container = document.createElement('div');
    container.className = 'user-checkbox';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `user-${usuario.id}`;
    checkbox.value = usuario.id;
    checkbox.checked = checked;
    checkbox.className = 'user-checkbox__input';

    const label = document.createElement('label');
    label.htmlFor = `user-${usuario.id}`;
    label.textContent = `${usuario.firstName} ${usuario.lastName}`;
    label.className = 'user-checkbox__label';

    container.appendChild(checkbox);
    container.appendChild(label);

    return container;
}

/**
 * Crea una opción para el select de filtro de usuarios
 * @param {Object} usuario - Datos del usuario
 * @returns {HTMLOptionElement} Elemento option
 */
export function crearOpcionUsuario(usuario) {
    const option = document.createElement('option');
    option.value = usuario.id;
    option.textContent = `${usuario.firstName} ${usuario.lastName} (${usuario.id})`;
    return option;
}
