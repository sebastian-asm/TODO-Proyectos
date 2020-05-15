const { body } = require('express-validator');
const { Router } = require('express');
const router = Router();

const {
  inicioController,
  formController,
  nuevoProyectoController,
  proyectoUrlController,
  formularioEditarController,
  actualizarProyectoController,
  eliminarProyectoController,
} = require('../controllers/proyectosController');

const {
  agregarTarea,
  cambiarEstadoTarea,
  eliminarTarea,
} = require('../controllers/tareasController');

const { crearCuenta } = require('../controllers/usuariosController');

// Rutas de los proyectos
router.get('/', inicioController);
router.get('/nuevo-proyecto', formController);
router.post(
  '/nuevo-proyecto',
  body('nombre').not().isEmpty().trim().escape(),
  nuevoProyectoController
);
router.get('/proyecto/:url', proyectoUrlController);
router.get('/proyecto/editar/:id', formularioEditarController);
router.post(
  '/nuevo-proyecto/:id',
  body('nombre').not().isEmpty().trim().escape(),
  actualizarProyectoController
);
router.delete('/proyectos/:url', eliminarProyectoController);

// Rutas de las tareas
router.post('/proyectos/:url', agregarTarea);
router.patch('/tareas/:id', cambiarEstadoTarea);
router.delete('/tareas/:id', eliminarTarea);

// Nuevas cuentas
router.get('/crear-cuenta', crearCuenta);

module.exports = router;
