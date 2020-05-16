const Usuarios = require('../models/Usuarios');

const formCrearCuenta = (req, res) => {
  res.render('crearCuenta', {
    tituloPag: 'Crear nueva cuenta',
  });
};

const crearCuenta = async (req, res) => {
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
    });
  }
};

module.exports = { formCrearCuenta, crearCuenta };
