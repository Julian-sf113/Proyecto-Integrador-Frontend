// Punto de entrada para la vista de usuario.
import './styles.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { verificarAutenticacion } from './auth/guard.js';
import { iniciarVistaUsuario } from './controllers/user/index.js';

if (verificarAutenticacion()) {
    document.addEventListener('DOMContentLoaded', iniciarVistaUsuario);
}
