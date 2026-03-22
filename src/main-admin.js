// Punto de entrada para la vista de administrador.
import './styles.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { verificarAutenticacion, verificarRolAdmin } from './auth/guard.js';
import { iniciarVistaAdmin } from './controllers/admin/index.js';

if (verificarAutenticacion() && verificarRolAdmin()) {
    document.addEventListener('DOMContentLoaded', iniciarVistaAdmin);
}
