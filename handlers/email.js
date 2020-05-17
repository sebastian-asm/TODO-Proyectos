const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice'); // Transformar a html
const htmlTotxt = require('html-to-text');
// Un modulo que no soporte async, con util lo permite
// Como en el caso de nodemailer que utiliza Promise
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

const generarHtml = (archivo, opciones = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/emails/${archivo}.pug`,
    opciones
  );
  return juice(html);
};

exports.enviar = async (opciones) => {
  const html = generarHtml(opciones.archivo, opciones);
  const text = htmlTotxt.fromString(html);
  let opcionesEmail = {
    from: 'Taks <no-reply@taks.com>',
    to: opciones.usuario.email,
    subject: opciones.subject,
    text,
    html,
  };

  // transport.sendMail(opcionesEmail);
  const enviarEmail = util.promisify(transport.sendMail, transport);
  return enviarEmail.call(transport, opcionesEmail);
};
