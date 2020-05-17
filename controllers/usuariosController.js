const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
  res.render('crearCuenta', {
    tituloPag: 'Crear nueva cuenta',
  });
};

exports.crearCuenta = async (req, res) => {
  const { email, password } = req.body;

  // Manejando el error en caso de haber email duplicado
  try {
    await Usuarios.create({
      email,
      password,
    });
    res.redirect('/iniciar-sesion');
  } catch (error) {
    // Capturando errores con content-flash
    req.flash(
      'error',
      error.errors.map((error) => error.message)
    );
    res.render('crearCuenta', {
      tituloPag: 'Crear nueva cuenta',
      mensajes: req.flash(),
      email,
      password,
    });
  }
};

exports.formIniciarSesion = (req, res) => {
  const { error } = res.locals.mensajes;

  res.render('iniciarSesion', {
    tituloPag: 'Iniciar Sesión',
    error,
  });
};

exports.formRestablecerPassword = (req, res) => {
  res.render('recuperar', {
    tituloPag: 'Recuperar contraseña',
  });
};
