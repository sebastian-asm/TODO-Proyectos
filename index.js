const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Helpers
const helpers = require('./helpers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de los archivos estáticos
app.use(express.static('public'));

// Configuración de la vista
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Otras configuraciones
// Pasar vardump para depurar en toda la app
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

// Conexión a MySQL
const db = require('./config/db');
require('./models/Proyectos');
require('./models/Tareas');
// db.authenticate() solo hace conexión al servidor
// db.sync() nos crea el modelo, pero primero hay que importarlo
db.sync()
  .then(() => console.log('Conectado a MySQL'))
  .catch(console.log);

// Rutas
app.use('/', routes);

app.listen(3000, () => console.log(`Servidor en puerto 3000`));
