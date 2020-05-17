const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

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

    const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
    const usuario = { email };

    await enviarEmail.enviar({
      usuario,
      confirmarUrl,
      subject: 'Confirma tu cuenta',
      archivo: 'confirmar',
    });

    req.flash('correcto', 'Enviamos un email de confirmación');
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

exports.confirmarCuenta = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: { email: req.params.email },
  });

  if (!usuario) {
    req.flash('error', 'No es válido');
    res.redirect('/crear-cuenta');
  }

  // Activando al usuario cuando confirma su email
  usuario.activo = 1;
  await usuario.save();

  req.flash('correcto', 'Cuenta activada!');
  res.redirect('/iniciar-sesion');
};
