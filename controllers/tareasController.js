const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
  const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });
  const { tarea } = req.body;
  const estado = 0;
  const proyectoId = proyecto.id;

  const resp = await Tareas.create({ tarea, estado, proyectoId });

  if (!resp) return next();

  res.redirect(`/proyecto/${req.params.url}`);
};

exports.cambiarEstadoTarea = async (req, res, next) => {
  const { id } = req.params;
  const tarea = await Tareas.findOne({ where: { id } });
  let estado = 0;

  if (tarea.estado === estado) estado = 1;
  tarea.estado = estado;

  const resp = await tarea.save();

  if (!resp) return next();

  res.send('Tarea actualizada');
};

exports.eliminarTarea = async (req, res, next) => {
  const { id } = req.params;
  const resp = await Tareas.destroy({ where: { id } });

  if (!resp) return next();

  res.send('Tarea eliminada correctamente');
};
