const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const passport = require('passport');
const crypto = require('crypto'); // Utilidad para generar tokens
const bcrypt = require('bcrypt-node'); // Hashear la contraseña
const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son necesarios',
});

// Verificar si usuario esta logueado
exports.usuarioAutenticado = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect('/iniciar-sesion');
};

exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'));
};

exports.enviarToken = async (req, res) => {
  // Verificar si el usuario existe
  const { email } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
    req.flash('error', 'No existe la cuenta');
    res.redirect('/recuperar');
  }

  // Generando token de forma nativa en Node
  usuario.token = crypto.randomBytes(20).toString('hex');
  usuario.expira = Date.now() + 3600000; // Valido por 1 hora

  // Guardar en la db con token y expiración
  await usuario.save();

  const resetUrl = `http://${req.headers.host}/recuperar/${usuario.token}`;

  // Enviar email con token
  await enviarEmail.enviar({
    usuario,
    resetUrl,
    subject: 'Reestablecer contraseña',
    archivo: 'recuperarPass',
  });
};

exports.validarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: { token: req.params.token },
  });

  console.log('validar token', req.params.token);

  if (!usuario) {
    req.flash('error', 'No válido');
    res.redirect('/recuperar');
  }

  res.render('resetPassword', {
    tituloPag: 'Reestablecer contraseña',
  });
};

exports.actualizarPassword = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expira: {
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!usuario) {
    req.flash('error', 'No es válido');
    res.redirect('/recuperar');
  }

  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expira = null;

  // Guardar cambios en la db
  await usuario.save();
  req.flash('correcto', 'Contraseña modificada correctamente');
  res.redirect('/iniciar-sesion');
};
