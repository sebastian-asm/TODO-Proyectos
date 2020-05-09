const Sequelize = require('sequelize');

const db = new Sequelize('tasksnode', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

module.exports = db;
