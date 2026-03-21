// =============================================================================
// FUNCIONES UI - controllers/user/funcionesUI.js
// =============================================================================
// Funciones para manipular la interfaz de usuario en la vista de usuario.

import { estado, contadorTareas, modalOverlay, modalContent } from './variables.js';
import { crearContenidoModal } from '../../ui/modalFeedback.js';

// Manejadores de eventos del modal
let manejadorCerrarModal = null;
let manejadorTeclaModal = null;

export function actualizarContador() {
    let textoContador = `${estado.totalTareas} tarea`;
    if (estado.totalTareas !== 1) {
        textoContador = `${textoContador}s`;
    }
    contadorTareas.textContent = textoContador;
}

export function cerrarModalFeedback() {
    modalOverlay.classList.remove('modal-overlay--visible');
    if (manejadorTeclaModal) {
        document.removeEventListener('keydown', manejadorTeclaModal);
        manejadorTeclaModal = null;
    }
    const botonCerrar = document.getElementById('modalCloseBtn');
    if (botonCerrar && manejadorCerrarModal) {
        botonCerrar.removeEventListener('click', manejadorCerrarModal);
        manejadorCerrarModal = null;
    }
}

export function mostrarModalFeedback(tipo, titulo, texto, pista = '') {
    cerrarModalFeedback();

    modalContent.className = `modal-content modal-content--${tipo}`;
    modalContent.textContent = '';

    const fragmento = crearContenidoModal(tipo, titulo, texto, pista);
    modalContent.appendChild(fragmento);

    modalOverlay.classList.add('modal-overlay--visible');

    manejadorCerrarModal = () => cerrarModalFeedback();
    manejadorTeclaModal = (evento) => {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            cerrarModalFeedback();
        }
    };

    const botonCerrar = document.getElementById('modalCloseBtn');
    botonCerrar.addEventListener('click', manejadorCerrarModal);
    document.addEventListener('keydown', manejadorTeclaModal);
    botonCerrar.focus();
}
