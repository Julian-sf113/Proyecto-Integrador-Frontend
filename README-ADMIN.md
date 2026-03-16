# Gestor de Tareas - Funcionalidades Administrativas

## 🚀 Nuevas Características Implementadas

### 1. Módulo de Administración de Usuarios
- **CRUD completo**: Crear, leer, actualizar y eliminar usuarios
- **Validación de formularios**: Email válido, documento entre 8-10 dígitos
- **Interfaz intuitiva**: Tarjetas de usuario con acciones de edición y eliminación
- **Confirmación de eliminación**: Alertas de SweetAlert2 para seguridad

### 2. Asignación Múltiple de Usuarios a Tareas
- **Checkboxes de selección**: Interfaz para seleccionar múltiples usuarios
- **Validación requerida**: Al menos un usuario debe ser seleccionado
- **Soporte para administradores**: Solo los administradores pueden asignar múltiples usuarios
- **Visualización de asignaciones**: Indicador visual de tareas con múltiples asignaciones

### 3. Panel Personalizado del Usuario
- **Vista filtrada**: Los usuarios solo ven sus tareas asignadas
- **Filtros avanzados**: Por estado, texto de búsqueda
- **Ordenamiento dinámico**: Por fecha, nombre, estado
- **Exportación de datos**: JSON de tareas visibles

### 4. Panel Administrativo Global
- **Vista maestra**: Todas las tareas del sistema
- **Filtro por usuario**: Selector dinámico de usuarios
- **Información detallada**: Muestra número de usuarios asignados
- **Modo administrativo**: Tarjetas con información adicional

### 5. Sistema de Navegación
- **Navegación principal**: Cambio entre vistas sin recargar
- **Indicador de usuario**: Muestra usuario actual en la navegación
- **Botón de logout**: Cierra sesión y resetea la aplicación
- **Diseño responsive**: Adaptable a dispositivos móviles

## 🏗️ Arquitectura del Sistema

### Estructura de Archivos
```
src/
├── controllers/
│   ├── index.js              # Controlador principal
│   ├── navigation.js          # Gestión de vistas
│   ├── adminUsuarios.js      # Administración de usuarios
│   ├── asignacionUsuarios.js # Asignación múltiple
│   └── ...
├── api/
│   ├── users/                 # Endpoints de usuarios
│   └── tasks/                 # Endpoints de tareas (nuevos)
├── ui/
│   ├── userCard.js           # Componentes de usuario
│   └── tarjetaTarea.js       # Tarjetas actualizadas
├── css/components/
│   └── navigation.css        # Estilos de navegación
└── ...
```

### Estado Global
El objeto `estado` ahora incluye:
- `vistaActual`: Vista activa ('usuario', 'administracion', 'admin-global')
- `esAdministrador`: Permisos del usuario
- `usuarios`: Lista de usuarios del sistema
- `todasLasTareas`: Todas las tareas para panel global
- `usuariosSeleccionados`: Para asignación múltiple

## 🔧 Configuración y Uso

### Para Acceder como Administrador
1. Iniciar sesión con cualquier documento de usuario
2. El sistema automáticamente otorga permisos de administrador
3. La navegación aparecerá con todas las opciones disponibles

### Crear Nuevo Usuario
1. Navegar a "Administrar Usuarios"
2. Completar el formulario con:
   - Nombres (2-50 caracteres)
   - Apellidos (2-50 caracteres)
   - Email (formato válido)
   - Documento (8-10 dígitos)
3. Click en "Guardar Usuario"

### Asignar Tarea a Múltiples Usuarios
1. En vista de usuario, crear nueva tarea
2. En la sección "Asignar a Usuarios", seleccionar los checkboxes deseados
3. La tarea se creará con todos los usuarios seleccionados

### Panel Administrativo Global
1. Navegar a "Panel Global"
2. Usar el filtro para ver tareas de un usuario específico
3. Las tarjetas muestran información de asignación múltiple

## 🎨 Componentes de UI

### Navegación Principal
- **Branding**: Logo y título del sistema
- **Menú de vistas**: Botones para cambiar entre vistas
- **Info de usuario**: Nombre y botón de logout
- **Responsive**: Adaptación a móviles

### Tarjetas de Usuario
- **Información básica**: Nombre, email, documento
- **Acciones**: Editar y eliminar
- **Estados visuales**: Hover y transiciones suaves

### Checkboxes de Asignación
- **Grid responsivo**: Adaptación al tamaño de pantalla
- **Estilos consistentes**: Diseño uniforme con el sistema
- **Validación visual**: Estados de selección claros

## 🔌 Integración con Backend

### Nuevos Endpoints Utilizados
- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario
- `POST /api/tasks/:id/assign` - Asignar usuarios a tarea
- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/filter` - Filtrar tareas

### Flujo de Datos
1. **Frontend** solicita datos al **Backend**
2. **Backend** procesa y devuelve datos estructurados
3. **Frontend** actualiza estado y renderiza UI
4. **Frontend** maneja validaciones y feedback al usuario

## 🚀 Mejoras Futuras Sugeridas

### Seguridad
- Implementar autenticación real (JWT)
- Roles y permisos específicos
- Validación de sesión

### Funcionalidades
- Drag & Drop para asignación de usuarios
- Notificaciones en tiempo real
- Historial de cambios en tareas
- Reportes y estadísticas

### Rendimiento
- Paginación de resultados
- Carga diferida de datos
- Cache inteligente

### UX/UI
- Modo oscuro/claro
- Personalización de dashboard
- Atajos de teclado
- Accesibilidad mejorada

## 🐛 Solución de Problemas Comunes

### Error: "No se pudieron cargar los usuarios"
- Verificar que el backend esté corriendo en el puerto 3000
- Revisar conexión de red
- Verificar endpoints del backend

### Error: "Debes seleccionar al menos un usuario"
- Al crear tarea como administrador, seleccionar al menos un checkbox
- La validación es requerida para asignación múltiple

### Problemas de Navegación
- Recargar la página si las vistas no cambian
- Verificar que el JavaScript se cargue sin errores
- Revisar la consola del navegador

---

**Desarrollado por:** Equipo de Desarrollo Web SENA  
**Versión:** 2.0 - Con funcionalidades administrativas  
**Última actualización:** Marzo 2026
