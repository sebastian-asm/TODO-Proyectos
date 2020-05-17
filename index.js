const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const morgan = require('morgan');

// Helpers
const helpers = require('./helpers');

const app = express();

// Configuración de los archivos estáticos
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser());
// Mantener sesiones abierta en express
// Sesión activa aunque el usuario no este haciendo nada en el sitio
app.use(
  session({
    secret: 'clave-secreta',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Configuración de la vista
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Otras configuraciones
// Pasar vardump para depurar en toda la app
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  // Mantener la referencia del usuario logueado
  // El operador ... hará una copia
  res.locals.usuario = { ...req.user } || null;
  next();
});

// Conexión a MySQL
const db = require('./config/db');
// Modelos
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
// db.authenticate() solo hace conexión al servidor
// db.sync() nos crea el modelo, pero primero hay que importarlo
db.sync()
  .then(() => console.log('Conectado a MySQL'))
  .catch(console.log);

// Rutas
app.use('/', routes);

app.listen(3000, () => console.log(`Servidor en puerto 3000`));
