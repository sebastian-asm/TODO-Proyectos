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

const {
  formCrearCuenta,
  crearCuenta,
  formIniciarSesion,
} = require('../controllers/usuariosController');

const authController = require('../controllers/authController');

// Rutas de los proyectos
router.get('/', authController.usuarioAutenticado, inicioController);

router.get(
  '/nuevo-proyecto',
  authController.usuarioAutenticado,
  formController
);

router.post(
  '/nuevo-proyecto',
  authController.usuarioAutenticado,
  body('nombre').not().isEmpty().trim().escape(),
  nuevoProyectoController
);

router.get(
  '/proyecto/:url',
  authController.usuarioAutenticado,
  proyectoUrlController
);

router.get(
  '/proyecto/editar/:id',
  authController.usuarioAutenticado,
  formularioEditarController
);

router.post(
  '/nuevo-proyecto/:id',
  authController.usuarioAutenticado,
  body('nombre').not().isEmpty().trim().escape(),
  actualizarProyectoController
);

router.delete(
  '/proyectos/:url',
  authController.usuarioAutenticado,
  eliminarProyectoController
);

// Rutas de las tareas
router.post('/proyectos/:url', authController.usuarioAutenticado, agregarTarea);

router.patch(
  '/tareas/:id',
  authController.usuarioAutenticado,
  cambiarEstadoTarea
);

router.delete('/tareas/:id', authController.usuarioAutenticado, eliminarTarea);

// Nuevas cuentas
router.get('/crear-cuenta', formCrearCuenta);
router.post('/crear-cuenta', crearCuenta);

// Iniciar sesión
router.get('/iniciar-sesion', formIniciarSesion);
router.post('/iniciar-sesion', authController.autenticarUsuario);

module.exports = router;
