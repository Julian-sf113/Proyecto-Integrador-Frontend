// Punto de entrada para la página de Login.
import './styles.css';
import { redirigirSiAutenticado } from './auth/guard.js';
import { iniciarLogin } from './controllers/login/index.js';

// Si ya está autenticado, redirigir a la vista correspondiente
if (!redirigirSiAutenticado()) {
    document.addEventListener('DOMContentLoaded', iniciarLogin);
}
