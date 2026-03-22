// =============================================================================
// VARIABLES Y ESTADO - controllers/user/variables.js
// =============================================================================
// Selectores del DOM y estado centralizado para la vista de usuario.

import { obtenerUsuario } from '../../auth/tokenManager.js';

// =============================================================================
// SELECTORES DEL DOM
// =============================================================================
export const selectores = {
    contenedorTareas: '#tasksContainer',
    estadoVacio: '#emptyState',
    contadorTareas: '#tasksCount',
    filtroEstadoBotones: '#filtroEstadoBotones',
    filtroTexto: '#filtroTexto',
    ordenCampo: '#ordenCampo',
    ordenDireccion: '#ordenDireccion',
    exportarBtn: '#exportarBtn',
    modalOverlay: '#feedbackModal',
    modalContent: '#feedbackModalContent'
};

// =============================================================================
// ESTADO CENTRALIZADO
// =============================================================================
export const estado = {
    usuarioActual: obtenerUsuario(),
    totalTareas: 0,
    tareas: [],
    tareasVisibles: [],
    filtros: {
        estado: '',
        texto: ''
    },
    ordenamiento: {
        campo: 'fecha',
        direccion: 'desc'
    }
};

// =============================================================================
// REFERENCIAS AL DOM (se inicializan al cargar)
// =============================================================================
export let contenedorTareas;
export let estadoVacio;
export let contadorTareas;
export let filtroEstadoBotones;
export let filtroTexto;
export let ordenCampo;
export let ordenDireccion;
export let exportarBtn;
export let modalOverlay;
export let modalContent;

export function inicializarReferencias() {
    contenedorTareas = document.querySelector(selectores.contenedorTareas);
    estadoVacio = document.querySelector(selectores.estadoVacio);
    contadorTareas = document.querySelector(selectores.contadorTareas);
    filtroEstadoBotones = document.querySelector(selectores.filtroEstadoBotones);
    filtroTexto = document.querySelector(selectores.filtroTexto);
    ordenCampo = document.querySelector(selectores.ordenCampo);
    ordenDireccion = document.querySelector(selectores.ordenDireccion);
    exportarBtn = document.querySelector(selectores.exportarBtn);
    modalOverlay = document.querySelector(selectores.modalOverlay);
    modalContent = document.querySelector(selectores.modalContent);
}
