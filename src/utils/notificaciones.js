// =============================================================================
// MÓDULO DE NOTIFICACIONES TOAST - utils/notificaciones.js
// =============================================================================
// RF03: Sistema de notificaciones independiente y reutilizable.
// No depende del módulo API ni de ningún otro módulo de la aplicación.

const DURACION_DEFAULT = 4000;
let contenedor = null;

function obtenerContenedor() {
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.className = 'notificaciones-contenedor';
        document.body.appendChild(contenedor);
    }
    return contenedor;
}

/**
 * Cierra una notificación con animación de salida.
 * Usa un timeout como respaldo en caso de que animationend no se dispare.
 * @param {HTMLElement} notif
 */
function cerrarNotificacion(notif) {
    // Evitar doble cierre
    if (notif.dataset.cerrando) return;
    notif.dataset.cerrando = 'true';

    notif.classList.add('notificacion--saliendo');

    // Fallback: eliminar tras la duración de la animación (300ms) + margen
    setTimeout(() => notif.remove(), 350);
}

function mostrar(tipo, mensaje, duracion = DURACION_DEFAULT) {
    const cont = obtenerContenedor();

    const notif = document.createElement('div');
    notif.className = `notificacion notificacion--${tipo}`;
    notif.setAttribute('role', 'alert');

    const iconos = { success: '✓', error: '✗', info: 'ℹ' };

    const icono = document.createElement('span');
    icono.className = 'notificacion__icono';
    icono.setAttribute('aria-hidden', 'true');
    icono.textContent = iconos[tipo] ?? 'ℹ';

    const texto = document.createElement('span');
    texto.className = 'notificacion__texto';
    texto.textContent = mensaje;

    const btnCerrar = document.createElement('button');
    btnCerrar.className = 'notificacion__cerrar';
    btnCerrar.setAttribute('aria-label', 'Cerrar notificación');
    btnCerrar.innerHTML = '&times;';
    btnCerrar.addEventListener('click', () => cerrarNotificacion(notif));

    notif.appendChild(icono);
    notif.appendChild(texto);
    notif.appendChild(btnCerrar);
    cont.appendChild(notif);

    // Cierre automático
    setTimeout(() => cerrarNotificacion(notif), duracion);
}

export function notificarExito(mensaje, duracion) {
    mostrar('success', mensaje, duracion);
}

export function notificarError(mensaje, duracion) {
    mostrar('error', mensaje, duracion);
}

export function notificarInfo(mensaje, duracion) {
    mostrar('info', mensaje, duracion);
}
