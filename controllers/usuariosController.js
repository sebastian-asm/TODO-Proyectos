const crearCuenta = (req, res) => {
  res.render('crearCuenta', {
    tituloPag: 'Crear nueva cuenta',
  });
};

module.exports = { crearCuenta };
