const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-node');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');

const Usuarios = db.define(
  'usuarios',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false, // El campo no puede estar vacío
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);

// Los usuarios puede crear multiples proyectos
// Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
