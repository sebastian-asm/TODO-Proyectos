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
    res.render('crearCuenta', {
      tituloPag: 'Crear nueva cuenta',
      errores: error.errors,
    });
  }
};

module.exports = { formCrearCuenta, crearCuenta };
