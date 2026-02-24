export function crearTarjetaTarea(nombreCompleto, iniciales, tareaCreada, estadoClase, estadoTexto, fechaHora) {
    const tarjetaTarea = document.createElement('div');
    tarjetaTarea.className = 'message-card';

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

    const divContenido = document.createElement('div');
    divContenido.className = 'message-card__content';

    const strongTitulo = document.createElement('strong');
    strongTitulo.textContent = tareaCreada.title;

    const br = document.createElement('br');

    const textoDescripcion = document.createTextNode(tareaCreada.body);

    const divEstado = document.createElement('div');
    divEstado.className = `message-card__status ${estadoClase}`;
    divEstado.textContent = 'Estado: ';

    const bEstado = document.createElement('b');
    bEstado.textContent = estadoTexto;
    divEstado.appendChild(bEstado);

    divContenido.appendChild(strongTitulo);
    divContenido.appendChild(br);
    divContenido.appendChild(textoDescripcion);
    divContenido.appendChild(divEstado);

    tarjetaTarea.appendChild(header);
    tarjetaTarea.appendChild(divContenido);

    return tarjetaTarea;
}
