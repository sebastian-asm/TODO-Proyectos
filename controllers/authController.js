const passport = require('passport');

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
