// =============================================================================
// SECCIÓN DASHBOARD - controllers/admin/seccionDashboard.js
// =============================================================================
// Carga y renderiza las estadísticas del dashboard administrativo.

import { dashboardGrid } from './variables.js';
import { getDashboard } from '../../api/dashboard/getDashboard.js';
import { renderizarDashboard } from '../../ui/dashboardStats.js';
import { notificarError } from '../../utils/notificaciones.js';

export async function cargarDashboard() {
    try {
        const datos = await getDashboard();
        renderizarDashboard(dashboardGrid, datos);
    } catch (error) {
        notificarError('Error al cargar el dashboard.');
    }
}
