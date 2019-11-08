const {
    Sequelize: { Op }
  } = require('../models'),
  config = require('../../config');

exports.generateNewPassword = (size = -10) =>
  Math.random()
    .toString(36)
    .slice(size);

exports.generateNewCode = () => exports.generateNewPassword(-8);

exports.getPageParams = query => {
  const page = parseInt(query.page) || 0;
  const limit = parseInt(query.limit) || 0;
  const offset = (page - 1) * limit;
  return { page, limit, offset: offset < 0 ? 0 : offset };
};

exports.substring = field => field && { [Op.substring]: field };

exports.generateNewUserMail = ({ email, password }) => ({
  to: email,
  subject: '[UNQuivalencias] Registro',
  text: `
    Has sido registrado en UNQuivalencias, 
    
    Password: ${password}

    Saludos!
  `
});

exports.generateConsultToProfessorMail = (requestId, { email }, subjectId) => ({
  to: email,
  subject: `[UNQuivalencias] Solicitud ${requestId}`,
  text: `
    Se ha requerido su opinión sobre una equivalencia.

    Link: ${config.common.api.frontUrl}/solicitud/${requestId}/materia/${subjectId}

    Saludos! `
});

exports.generateRecommendMail = ({ subjectUnqName, subjectNames }, email) => ({
  to: email,
  subject: `[UNQuivalencias] Recomendacion ${subjectUnqName}`,
  text: `
    Se ha rechazado la solicitud de equivalencia a la materia '${subjectUnqName}'.

    Se solicitan las siguientes materias para reabrir el expediente y poder aprobar la solicitud:

    ${subjectNames}.

    Saludos! `
});

exports.generateCodeMail = ({ email }, code) => ({
  to: email,
  subject: `[UNQuivalencias] Código de verificación`,
  text: `
    Utilice el código para reestablecer su contraseña.

    Código de verificación: ${code}

    Saludos! `
});

exports.generateNewPasswordMail = ({ email }, password) => ({
  to: email,
  subject: `[UNQuivalencias] Nueva contraseña`,
  text: `
    Se ha reestablecido su contraseña.

    Nueva contraseña: ${password}

    Saludos! `
});
