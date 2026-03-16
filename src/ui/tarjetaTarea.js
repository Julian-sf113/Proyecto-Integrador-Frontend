export function crearTarjetaTarea(tarea, esModoAdmin = false) {
    const tarjetaTarea = document.createElement('div');
    tarjetaTarea.className = 'message-card';
    tarjetaTarea.dataset.taskId = tarea.id;

    const header = document.createElement('div');
    header.className = 'message-card__header';

    // Información del usuario (principal asignado)
    const divUsuario = document.createElement('div');
    divUsuario.className = 'message-card__user';

    const divAvatar = document.createElement('div');
    divAvatar.className = 'message-card__avatar';
    
    // Obtener iniciales del primer usuario asignado o del creador
    const nombreUsuario = obtenerNombreUsuario(tarea);
    const iniciales = obtenerInicialesUsuario(nombreUsuario);
    divAvatar.textContent = iniciales;

    const spanNombre = document.createElement('span');
    spanNombre.className = 'message-card__username';
    spanNombre.textContent = nombreUsuario;

    divUsuario.appendChild(divAvatar);
    divUsuario.appendChild(spanNombre);

    const spanFecha = document.createElement('span');
    spanFecha.className = 'message-card__timestamp';
    spanFecha.textContent = obtenerTextoFechaHoraActual(tarea.createdAt);

    header.appendChild(divUsuario);
    header.appendChild(spanFecha);

    const divContenido = document.createElement('div');
    divContenido.className = 'message-card__content';

    const strongTitulo = document.createElement('strong');
    strongTitulo.textContent = tarea.title;

    const br = document.createElement('br');

    const textoDescripcion = document.createTextNode(tarea.body || tarea.description || '');

    const divEstado = document.createElement('div');
    divEstado.className = `message-card__status ${obtenerClaseEstado(tarea.status)}`;
    divEstado.textContent = 'Estado: ';

    const bEstado = document.createElement('b');
    bEstado.textContent = obtenerEtiquetaEstado(tarea.status);
    divEstado.appendChild(bEstado);

    divContenido.appendChild(strongTitulo);
    divContenido.appendChild(br);
    divContenido.appendChild(textoDescripcion);
    divContenido.appendChild(divEstado);

    // Mostrar usuarios asignados si hay múltiples y es modo admin
    if (esModoAdmin && tarea.assignedUserIds && tarea.assignedUserIds.length > 1) {
        const divAsignados = document.createElement('div');
        divAsignados.className = 'message-card__assigned';
        
        const smallLabel = document.createElement('small');
        smallLabel.className = 'assigned-label';
        
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-users';
        
        const text = document.createTextNode(`Asignado a ${tarea.assignedUserIds.length} usuarios`);
        
        smallLabel.appendChild(icon);
        smallLabel.appendChild(text);
        divAsignados.appendChild(smallLabel);
        divContenido.appendChild(divAsignados);
    }

    const divFooter = document.createElement('div');
    divFooter.className = 'message-card__footer';

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn-editar';
    btnEditar.textContent = 'Editar';
    btnEditar.setAttribute('data-id', tarea.id);

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.setAttribute('data-id', tarea.id);

    const iconoEliminar = document.createElement('i');
    iconoEliminar.classList.add('fa-solid', 'fa-trash');
    btnEliminar.appendChild(iconoEliminar);

    divFooter.appendChild(btnEditar);
    divFooter.appendChild(btnEliminar);

    tarjetaTarea.appendChild(header);
    tarjetaTarea.appendChild(divContenido);
    tarjetaTarea.appendChild(divFooter);

    return tarjetaTarea;
}

// Funciones auxiliares
function obtenerNombreUsuario(tarea) {
    // Si hay usuarios asignados, mostrar el primero
    if (tarea.assignedUserIds && tarea.assignedUserIds.length > 0) {
        return `Usuario ${tarea.assignedUserIds[0]}`;
    }
    
    // Si no, mostrar el creador
    if (tarea.userId) {
        return `Usuario ${tarea.userId}`;
    }
    
    return 'Usuario desconocido';
}

// Importaciones necesarias (asumimos que existen en services)
function obtenerInicialesUsuario(nombre) {
    return nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function obtenerTextoFechaHoraActual(fecha) {
    if (!fecha) return new Date().toLocaleString();
    return new Date(fecha).toLocaleString();
}

function obtenerClaseEstado(estado) {
    const mapaEstados = {
        'pendiente': 'status-pending',
        'incompleta': 'status-pending',
        'en-proceso': 'status-progress',
        'finalizada': 'status-completed'
    };
    return mapaEstados[estado] || 'status-pending';
}

function obtenerEtiquetaEstado(estado) {
    const mapaEtiquetas = {
        'pendiente': 'Pendiente',
        'incompleta': 'Pendiente',
        'en-proceso': 'En Proceso',
        'finalizada': 'Completada'
    };
    return mapaEtiquetas[estado] || estado;
}
