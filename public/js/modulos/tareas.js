import Swal from 'sweetalert2';
import axios from 'axios';
import { actualizarAvance } from './funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
  tareas.addEventListener('click', (e) => {
    // console.log(e.target.classList);
    if (e.target.classList.contains('fa-check-circle')) {
      const icono = e.target;
      const tareaId = icono.parentElement.parentElement.dataset.tarea;
      const url = `${location.origin}/tareas/${tareaId}`;

      axios
        .patch(url, { tareaId })
        .then((resp) => {
          if (resp.status === 200) {
            icono.classList.toggle('completo');
            actualizarAvance();
          }
        })
        .catch(console.log);
    }

    if (e.target.classList.contains('fa-trash')) {
      const tareaHTML = e.target.parentElement.parentElement;
      const tareaId = tareaHTML.dataset.tarea;
      const url = `${location.origin}/tareas/${tareaId}`;

      Swal.fire({
        title: '¿Estas seguro?',
        text: 'Eliminar esta tarea',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          // Enviar la peticion delete por Axios
          axios
            .delete(url, { params: { tareaId } })
            .then((resp) => {
              if (resp.status === 200) {
                // Eliminar el nodo de la lista
                tareaHTML.parentElement.removeChild(tareaHTML);
                Swal.fire({
                  title: 'Eliminada',
                  text: resp.data,
                  icon: 'success',
                });

                actualizarAvance();
              }
            })
            .catch(console.log);
        }
      });
    }
  });
}

export default tareas;
