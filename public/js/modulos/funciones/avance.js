import Swal from 'sweetalert2';

export const actualizarAvance = () => {
  const tareas = document.querySelectorAll('li.tarea');

  if (tareas.length) {
    const tareasCompletadas = document.querySelectorAll('i.completo');
    const avance = Math.round((tareasCompletadas.length / tareas.length) * 100);
    const porcentaje = document.getElementById('porcentaje');

    porcentaje.style.width = `${avance}%`;

    if (avance === 100) {
      Swal.fire({
        title: 'Proyecto completado',
        text: 'Se realizaron todas las tareas de este proyecto',
        icon: 'success',
      });
    }
  }
};
