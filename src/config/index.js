// =============================================================================
// CONFIGURACIÓN GLOBAL DE LA APLICACIÓN - config/index.js
// =============================================================================
// Este archivo contiene toda la configuración centralizada de la aplicación.
// Incluye URLs de API, reglas de validación y constantes globales.

// =============================================================================
// CONFIGURACIÓN DE API
// =============================================================================
// URL base para todas las llamadas a la API del backend
// Si VITE_API_URL no está definida durante `vite dev`, se usa una ruta relativa
// para que el proxy de Vite reenvíe `/api` al backend local en el puerto 3000.
// Fuera de desarrollo se conserva un fallback local para `vite preview`; para
// despliegues o entornos externos conviene definir VITE_API_URL explícitamente.
const limpiarURLAPI = (valor) => {
    if (typeof valor !== 'string') {
        return '';
    }

    return valor.trim().replace(/\/$/, '');
};

const urlAPIConfigurada = limpiarURLAPI(import.meta.env.VITE_API_URL);
const urlAPILocal = 'http://localhost:3000';

export const urlAPI = urlAPIConfigurada || (import.meta.env.DEV ? '' : urlAPILocal);

// =============================================================================
// REGLAS DE VALIDACIÓN - BÚSQUEDA DE USUARIO
// =============================================================================
// Define las reglas de validación para el campo de documento de usuario
export const reglasBusqueda = {
    documento: {
        required: true,                                    // Campo obligatorio
        min: 8,                                           // Mínimo 8 caracteres
        max: 10,                                          // Máximo 10 caracteres
        mensaje: 'El número de documento es obligatorio.',
        mensajeMin: 'El documento debe tener mínimo 8 dígitos.',
        mensajeMax: 'El documento debe tener máximo 10 dígitos.'
    }
};

// =============================================================================
// REGLAS DE VALIDACIÓN - FORMULARIO DE TAREAS
// =============================================================================
// Define las reglas de validación para los campos del formulario de tareas
export const reglasTarea = {
    titulo: {
        required: true,
        mensaje: 'El título de la tarea es obligatorio.'
    },
    estado: {
        required: true,
        mensaje: 'Debe seleccionar un estado para la tarea.'
    },
    descripcion: {
        required: true,
        mensaje: 'La descripción de la tarea es obligatoria.'
    }
};

// =============================================================================
// REGLAS DE VALIDACIÓN - LOGIN
// =============================================================================
export const reglasLogin = {
    email: {
        required: true,
        mensaje: 'El correo electrónico es obligatorio.'
    },
    password: {
        required: true,
        mensaje: 'La contraseña es obligatoria.'
    }
};

// =============================================================================
// REGLAS DE VALIDACIÓN - FORMULARIO DE USUARIO (ADMIN)
// =============================================================================
export const reglasUsuario = {
    firstName: {
        required: true,
        mensaje: 'El nombre es obligatorio.'
    },
    lastName: {
        required: true,
        mensaje: 'El apellido es obligatorio.'
    },
    email: {
        required: true,
        mensaje: 'El correo electrónico es obligatorio.'
    }
};

// =============================================================================
// CONSTANTES DE ESTADOS Y PRIORIDADES (BACKEND)
// =============================================================================
export const ESTADOS_TAREA = {
    PENDIENTE: 'pendiente',
    EN_PROGRESO: 'en progreso',
    COMPLETADA: 'completada'
};

export const PRIORIDADES_TAREA = {
    BAJA: 'baja',
    MEDIA: 'media',
    ALTA: 'alta'
};

export const ESTADOS_USUARIO = {
    ACTIVO: 'activo',
    INACTIVO: 'inactivo',
    SUSPENDIDO: 'suspendido',
    ELIMINADO: 'eliminado'
};

export const ROLES_USUARIO = {
    ADMIN: 'admin',
    USUARIO: 'usuario'
};
