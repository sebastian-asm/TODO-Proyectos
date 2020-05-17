const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');

// Credenciales propias (email y contraseña)
passport.use(
  new localStrategy(
    {
      // Definir segun el nombre en el modelo
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const usuario = await Usuarios.findOne({
          where: {
            email,
            activo: 1, // Solo las cuentas activas pueden ingresar
          },
        });

        // Si el usuario existe se verifica la contraseña
        if (!usuario.verificarPassword(password)) {
          return done(null, false, {
            message: 'La contraseña no es válida',
          });
        }
        // En caso que todo este bien
        return done(null, usuario);
      } catch (error) {
        // Cuando el usuario no exista
        return done(null, false, {
          message: 'La cuenta no existe',
        });
      }
    }
  )
);

// Configuración necesaria para passport
// Serializar al usuario
passport.serializeUser((usuario, callback) => callback(null, usuario));

// Deserializar al usuario
passport.deserializeUser((usuario, callback) => callback(null, usuario));

module.exports = passport;
