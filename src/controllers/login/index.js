// =============================================================================
// CONTROLADOR DE LOGIN - controllers/login/index.js
// =============================================================================
// Gestiona el formulario de inicio de sesión, valida los campos,
// llama a la API de autenticación y redirige según el rol del usuario.

import { reglasLogin } from '../../config/index.js';
import { validar } from '../../utils/validaciones.js';
import { loginAPI } from '../../api/auth/login.js';
import { guardarSesion } from '../../auth/tokenManager.js';

// =============================================================================
// REFERENCIAS AL DOM
// =============================================================================
let formularioLogin;
let inputEmail;
let inputPassword;
let errorEmail;
let errorPassword;
let mensajeLogin;
let botonLogin;

// =============================================================================
// INICIALIZACIÓN
// =============================================================================
export function iniciarLogin() {
    formularioLogin = document.querySelector('#loginForm');
    inputEmail = document.querySelector('#loginEmail');
    inputPassword = document.querySelector('#loginPassword');
    errorEmail = document.querySelector('#loginEmailError');
    errorPassword = document.querySelector('#loginPasswordError');
    mensajeLogin = document.querySelector('#loginMessage');
    botonLogin = document.querySelector('#loginBtn');

    configurarEventos();
}

// =============================================================================
// CONFIGURACIÓN DE EVENTOS
// =============================================================================
function configurarEventos() {
    formularioLogin.addEventListener('submit', manejarLogin);

    // Limpiar errores al escribir
    inputEmail.addEventListener('input', () => {
        errorEmail.textContent = '';
        inputEmail.classList.remove('error');
    });

    inputPassword.addEventListener('input', () => {
        errorPassword.textContent = '';
        inputPassword.classList.remove('error');
    });
}

// =============================================================================
// MANEJADOR DE LOGIN
// =============================================================================
async function manejarLogin(evento) {
    evento.preventDefault();
    evento.stopPropagation();

    // Limpiar errores previos
    errorEmail.textContent = '';
    errorPassword.textContent = '';
    inputEmail.classList.remove('error');
    inputPassword.classList.remove('error');
    mensajeLogin.classList.add('hidden');
    mensajeLogin.textContent = '';

    // Validar campos
    const { valido, errores } = validar(formularioLogin, reglasLogin);

    if (!valido) {
        if (errores.email) {
            errorEmail.textContent = errores.email;
            inputEmail.classList.add('error');
        }
        if (errores.password) {
            errorPassword.textContent = errores.password;
            inputPassword.classList.add('error');
        }
        return;
    }

    // Deshabilitar botón mientras se procesa
    botonLogin.disabled = true;
    const textoOriginal = botonLogin.querySelector('.login-form__btn-text');
    const textoAnterior = textoOriginal.textContent;
    textoOriginal.textContent = 'Ingresando...';

    try {
        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();

        const respuesta = await loginAPI(email, password);

        // Guardar sesión con token y datos del usuario
        guardarSesion(respuesta.token, respuesta.data);

        // Redirigir según el rol
        if (respuesta.data.role === 'admin') {
            window.location.href = '/views/admin/';
        } else {
            window.location.href = '/views/user/';
        }

    } catch (error) {
        // Mostrar error en la interfaz
        mensajeLogin.textContent = error.message;
        mensajeLogin.classList.remove('hidden');
        mensajeLogin.classList.add('login-form__message--error');

        // Restaurar botón
        botonLogin.disabled = false;
        textoOriginal.textContent = textoAnterior;
    }
}
