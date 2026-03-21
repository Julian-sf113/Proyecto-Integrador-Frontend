// =============================================================================
// COMPONENTE DASHBOARD STATS - ui/dashboardStats.js
// =============================================================================
// Crea tarjetas de estadísticas para el dashboard del administrador.

/**
 * Crea una tarjeta de estadística
 * @param {string} icono - Clase de Font Awesome
 * @param {string} titulo - Título de la estadística
 * @param {number|string} valor - Valor a mostrar
 * @param {string} colorClase - Clase CSS para el color
 */
export function crearTarjetaEstadistica(icono, titulo, valor, colorClase) {
    const tarjeta = document.createElement('div');
    tarjeta.className = `dashboard-card ${colorClase}`;

    const divIcono = document.createElement('div');
    divIcono.className = 'dashboard-card__icon';
    const i = document.createElement('i');
    i.className = icono;
    divIcono.appendChild(i);

    const divInfo = document.createElement('div');
    divInfo.className = 'dashboard-card__info';

    const spanValor = document.createElement('span');
    spanValor.className = 'dashboard-card__value';
    spanValor.textContent = valor;

    const spanTitulo = document.createElement('span');
    spanTitulo.className = 'dashboard-card__title';
    spanTitulo.textContent = titulo;

    divInfo.appendChild(spanValor);
    divInfo.appendChild(spanTitulo);

    tarjeta.appendChild(divIcono);
    tarjeta.appendChild(divInfo);

    return tarjeta;
}

/**
 * Renderiza todas las estadísticas del dashboard
 * @param {HTMLElement} contenedor - Elemento donde insertar
 * @param {Object} datos - Datos del dashboard { totals, tasksByStatus, tasksByPriority }
 */
export function renderizarDashboard(contenedor, datos) {
    contenedor.textContent = '';

    const { totals, tasksByStatus, tasksByPriority } = datos;

    const tarjetas = [
        { icono: 'fa-solid fa-users', titulo: 'Total Usuarios', valor: totals.users, color: 'dashboard-card--primary' },
        { icono: 'fa-solid fa-user-check', titulo: 'Usuarios Activos', valor: totals.activeUsers, color: 'dashboard-card--success' },
        { icono: 'fa-solid fa-user-xmark', titulo: 'Usuarios Inactivos', valor: totals.inactiveUsers, color: 'dashboard-card--warning' },
        { icono: 'fa-solid fa-list-check', titulo: 'Total Tareas', valor: totals.tasks, color: 'dashboard-card--info' },
        { icono: 'fa-solid fa-clock', titulo: 'Pendientes', valor: tasksByStatus.pendiente, color: 'dashboard-card--warning' },
        { icono: 'fa-solid fa-spinner', titulo: 'En Progreso', valor: tasksByStatus.enProgreso, color: 'dashboard-card--info' },
        { icono: 'fa-solid fa-circle-check', titulo: 'Completadas', valor: tasksByStatus.completada, color: 'dashboard-card--success' },
        { icono: 'fa-solid fa-link', titulo: 'Tareas Asignadas', valor: totals.assignedTasks, color: 'dashboard-card--primary' },
        { icono: 'fa-solid fa-link-slash', titulo: 'Sin Asignar', valor: totals.unassignedTasks, color: 'dashboard-card--danger' },
        { icono: 'fa-solid fa-arrow-down', titulo: 'Prioridad Baja', valor: tasksByPriority.baja, color: 'dashboard-card--success' },
        { icono: 'fa-solid fa-minus', titulo: 'Prioridad Media', valor: tasksByPriority.media, color: 'dashboard-card--warning' },
        { icono: 'fa-solid fa-arrow-up', titulo: 'Prioridad Alta', valor: tasksByPriority.alta, color: 'dashboard-card--danger' }
    ];

    tarjetas.forEach(({ icono, titulo, valor, color }) => {
        const tarjeta = crearTarjetaEstadistica(icono, titulo, valor, color);
        contenedor.appendChild(tarjeta);
    });
}
