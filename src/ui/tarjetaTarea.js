// =============================================================================
// COMPONENTE TARJETA DE TAREA - ui/tarjetaTarea.js
// =============================================================================
// Crea el elemento DOM de una tarjeta de tarea con toda su información.
// Soporta prioridad y conteo de usuarios asignados.

/**
 * Crea una tarjeta de tarea como elemento DOM
 * @param {string} nombreCompleto - Nombre del usuario
 * @param {string} iniciales - Iniciales del usuario
 * @param {Object} tarea - Datos de la tarea
 * @param {string} estadoClase - Clase CSS del estado
 * @param {string} estadoTexto - Texto legible del estado
 * @param {string} fechaHora - Fecha formateada
 * @param {Object} opciones - { mostrarPrioridad, mostrarAsignados, mostrarAcciones }
 */
export function crearTarjetaTarea(nombreCompleto, iniciales, tarea, estadoClase, estadoTexto, fechaHora, opciones = {}) {
    const {
        mostrarPrioridad = false,
        mostrarAsignados = false,
        mostrarAcciones = true,
        accionesAdmin = false
    } = opciones;

    const tarjetaTarea = document.createElement('div');
    tarjetaTarea.className = 'message-card';

    // Header
    const header = document.createElement('div');
    header.className = 'message-card__header';

    const divUsuario = document.createElement('div');
    divUsuario.className = 'message-card__user';

    const divAvatar = document.createElement('div');
    divAvatar.className = 'message-card__avatar';
    divAvatar.textContent = iniciales;

    const spanNombre = document.createElement('span');
    spanNombre.className = 'message-card__username';
    spanNombre.textContent = nombreCompleto;

    divUsuario.appendChild(divAvatar);
    divUsuario.appendChild(spanNombre);

    const spanFecha = document.createElement('span');
    spanFecha.className = 'message-card__timestamp';
    spanFecha.textContent = fechaHora;

    header.appendChild(divUsuario);
    header.appendChild(spanFecha);

    // Contenido
    const divContenido = document.createElement('div');
    divContenido.className = 'message-card__content';

    const strongTitulo = document.createElement('strong');
    strongTitulo.textContent = tarea.title;

    const br = document.createElement('br');

    const textoDescripcion = document.createTextNode(tarea.description || tarea.body || '');

    divContenido.appendChild(strongTitulo);
    divContenido.appendChild(br);
    divContenido.appendChild(textoDescripcion);

    // Badges container
    const divBadges = document.createElement('div');
    divBadges.className = 'message-card__badges';

    // Estado
    const divEstado = document.createElement('div');
    divEstado.className = `message-card__status ${estadoClase}`;
    divEstado.textContent = 'Estado: ';
    const bEstado = document.createElement('b');
    bEstado.textContent = estadoTexto;
    divEstado.appendChild(bEstado);
    divBadges.appendChild(divEstado);

    // Prioridad
    if (mostrarPrioridad && tarea.priority) {
        const divPrioridad = document.createElement('div');
        divPrioridad.className = `message-card__priority ${opciones.prioridadClase || ''}`;
        divPrioridad.textContent = 'Prioridad: ';
        const bPrioridad = document.createElement('b');
        bPrioridad.textContent = opciones.prioridadTexto || tarea.priority;
        divPrioridad.appendChild(bPrioridad);
        divBadges.appendChild(divPrioridad);
    }

    // Usuarios asignados
    if (mostrarAsignados && tarea.assignedUserIds) {
        const divAsignados = document.createElement('div');
        divAsignados.className = 'message-card__assigned';
        const iconoUsuarios = document.createElement('i');
        iconoUsuarios.classList.add('fa-solid', 'fa-users');
        divAsignados.appendChild(iconoUsuarios);
        const spanConteo = document.createElement('span');
        spanConteo.textContent = ` ${tarea.assignedUserIds.length} usuario(s) asignado(s)`;
        divAsignados.appendChild(spanConteo);
        divBadges.appendChild(divAsignados);
    }

    divContenido.appendChild(divBadges);

    // Footer con acciones
    const divFooter = document.createElement('div');
    divFooter.className = 'message-card__footer';

    if (mostrarAcciones) {
        if (accionesAdmin) {
            // Acciones admin: Editar, Asignar, Eliminar
            const btnEditar = document.createElement('button');
            btnEditar.className = 'btn-editar';
            btnEditar.textContent = 'Editar';
            btnEditar.setAttribute('data-id', tarea.id);

            const btnAsignar = document.createElement('button');
            btnAsignar.className = 'btn-asignar';
            const iconoAsignar = document.createElement('i');
            iconoAsignar.classList.add('fa-solid', 'fa-user-plus');
            btnAsignar.appendChild(iconoAsignar);
            const textoAsignar = document.createTextNode(' Asignar');
            btnAsignar.appendChild(textoAsignar);
            btnAsignar.setAttribute('data-id', tarea.id);

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-eliminar';
            btnEliminar.setAttribute('data-id', tarea.id);
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fa-solid', 'fa-trash');
            btnEliminar.appendChild(iconoEliminar);

            divFooter.appendChild(btnEditar);
            divFooter.appendChild(btnAsignar);
            divFooter.appendChild(btnEliminar);
        } else {
            // Acciones usuario: solo cambiar estado
            const selectEstado = document.createElement('select');
            selectEstado.className = 'btn-cambiar-estado';
            selectEstado.setAttribute('data-id', tarea.id);

            const estados = [
                { value: 'pendiente', text: 'Pendiente' },
                { value: 'en progreso', text: 'En Progreso' },
                { value: 'completada', text: 'Completada' }
            ];

            estados.forEach(({ value, text }) => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = text;
                if (tarea.status === value) {
                    option.selected = true;
                }
                selectEstado.appendChild(option);
            });

            divFooter.appendChild(selectEstado);
        }
    }

    tarjetaTarea.appendChild(header);
    tarjetaTarea.appendChild(divContenido);
    tarjetaTarea.appendChild(divFooter);

    return tarjetaTarea;
}
