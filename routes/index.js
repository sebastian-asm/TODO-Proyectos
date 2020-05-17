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

const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
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
router.post(
  '/proyectos/:url',
  authController.usuarioAutenticado,
  tareasController.agregarTarea
);

router.patch(
  '/tareas/:id',
  authController.usuarioAutenticado,
  tareasController.cambiarEstadoTarea
);

router.delete(
  '/tareas/:id',
  authController.usuarioAutenticado,
  tareasController.eliminarTarea
);

// Nuevas cuentas
router.get('/crear-cuenta', usuariosController.formCrearCuenta);
router.post('/crear-cuenta', usuariosController.crearCuenta);
router.get('/confirmar/:email', usuariosController.confirmarCuenta);

// Iniciar sesión
router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
router.post('/iniciar-sesion', authController.autenticarUsuario);

// Cerrar sesión
router.get('/cerrar-sesion', authController.cerrarSesion);

// Recuperar contraseña
router.get('/recuperar', usuariosController.formRestablecerPassword);
router.post('/recuperar', authController.enviarToken);
router.get('/recuperar/:token', authController.validarToken);
router.post('/recuperar/:token', authController.actualizarPassword);

module.exports = router;
