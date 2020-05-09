const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

const agregarTarea = async (req, res, next) => {
  const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });
  const { tarea } = req.body;
  const estado = 0;
  const proyectoId = proyecto.id;

  const resp = await Tareas.create({ tarea, estado, proyectoId });

  if (!resp) return next();

  res.redirect(`/proyecto/${req.params.url}`);
};

module.exports = {
  agregarTarea,
};
