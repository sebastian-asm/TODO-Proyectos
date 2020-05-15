const Usuarios = require('../models/Usuarios');

const formCrearCuenta = (req, res) => {
  res.render('crearCuenta', {
    tituloPag: 'Crear nueva cuenta',
  });
};

const crearCuenta = (req, res) => {
  const { email, password } = req.body;

  Usuarios.create({
    email,
    password,
  }).then(() => res.redirect('/iniciar-sesion'));
};

module.exports = { formCrearCuenta, crearCuenta };
