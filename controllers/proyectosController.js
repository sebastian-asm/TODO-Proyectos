const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
// const slug = require('slug');

const inicioController = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { usuarioId } });

  res.render('index', {
    tituloPag: 'Proyectos',
    proyectos,
  });
};

const formController = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { usuarioId } });

  res.render('nuevoProyecto', {
    tituloPag: 'Nuevo Proyecto',
    proyectos,
  });
};

const nuevoProyectoController = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { usuarioId } });
  const { nombre } = req.body;
  let errores = [];

  if (!nombre) errores.push({ mensaje: 'El proyecto debe tener un nombre' });

  if (errores.length > 0) {
    res.render('nuevoProyecto', {
      tituloPag: 'Nuevo Proyecto',
      errores,
      proyectos,
    });
  } else {
    // Creando url amigable con slug (versión 1)
    // const url = slug(nombre).toLocaleLowerCase();
    // La versión 2 se crea la url con hooks en el modelo
    // Insertando en la db
    const usuarioId = res.locals.usuario.id;
    await Proyectos.create({ nombre, usuarioId });
    res.redirect('/');
  }
};

const proyectoUrlController = async (req, res, next) => {
  // await se utiliza cuando una varible depende de otra para obtener info
  // de lo contrario mejor utilizar Promise, cuando son independientes
  const usuarioId = res.locals.usuario.id;
  const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });
  const proyectoPromise = Proyectos.findOne({
    where: { url: req.params.url, usuarioId },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  // Consultar tareas del proyecto
  const tareas = await Tareas.findAll({
    where: { proyectoId: proyecto.id },
    include: [{ model: Proyectos }],
  });

  if (!proyecto) return next();

  res.render('tareas', {
    tituloPag: 'Tareas del proyecto',
    proyecto,
    proyectos,
    tareas,
  });
};

const formularioEditarController = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });
  const proyectoPromise = Proyectos.findOne({
    where: { id: req.params.id, usuarioId },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  res.render('nuevoProyecto', {
    tituloPag: 'Editar Proyecto',
    proyecto,
    proyectos,
  });
};

const actualizarProyectoController = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { usuarioId } });
  const { nombre } = req.body;
  let errores = [];

  if (!nombre) errores.push({ mensaje: 'El proyecto debe tener un nombre' });

  if (errores.length > 0) {
    res.render('nuevoProyecto', {
      tituloPag: 'Nuevo Proyecto',
      errores,
      proyectos,
    });
  } else {
    await Proyectos.update({ nombre }, { where: { id: req.params.id } });
    res.redirect('/');
  }
};

const eliminarProyectoController = async (req, res, next) => {
  const { proyectoUrl } = req.query;
  const resp = await Proyectos.destroy({ where: { url: proyectoUrl } });

  if (!resp) return next();

  res.send('Proyecto eliminado');
};

module.exports = {
  inicioController,
  formController,
  nuevoProyectoController,
  proyectoUrlController,
  formularioEditarController,
  actualizarProyectoController,
  eliminarProyectoController,
};
