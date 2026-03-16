import Swal from 'sweetalert2';

export async function confirmarEliminacionTarea() {
    const resultado = await Swal.fire({
        title: '¿Eliminar tarea?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        focusCancel: true
    });

    return resultado.isConfirmed;
}

export async function confirmarEliminacionUsuario() {
    const resultado = await Swal.fire({
        title: '¿Eliminar usuario?',
        text: 'Esta acción no se puede deshacer y también eliminará todas sus tareas asociadas.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        focusCancel: true
    });

    return resultado.isConfirmed;
}
