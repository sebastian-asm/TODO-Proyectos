const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid'); // Crear id sencillos
const db = require('../config/db');

const Proyectos = db.define(
  'proyectos',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING,
  },
  {
    // Los hooks se ejecutan antes de una instrucción
    // en este caso se ejecuta antes de crear el registro en la db
    hooks: {
      beforeCreate(proyecto) {
        // console.log('Antes de guardar en db');
        const url = slug(proyecto.nombre).toLowerCase();
        proyecto.url = `${url}-${shortid.generate()}`;
      },
    },
  }
);

module.exports = Proyectos;
