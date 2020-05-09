import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.getElementById('eliminar-proyecto');

if (btnEliminar) {
  btnEliminar.addEventListener('click', (e) => {
    const proyectoUrl = e.target.dataset.proyectoUrl;

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Eliminar este proyecto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        const url = `${location.origin}/proyectos/${proyectoUrl}`;

        axios
          .delete(url, { params: { proyectoUrl } })
          .then((resp) => {
            Swal.fire('Eliminado!', resp.data, 'success');

            setTimeout(() => {
              window.location.href = '/';
            }, 3000);
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Hubo un error',
              text: 'No se pudo eliminar el proyecto',
            });
          });
      }
    });
  });
}

export default btnEliminar;
