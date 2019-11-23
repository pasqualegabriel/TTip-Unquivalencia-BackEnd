const {
    Sequelize: { Op }
  } = require('../models'),
  config = require('../../config'),
  { get, find, orderBy } = require('lodash');

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
  subject: '[UNQ-EQV] Registro',
  text: `
    Has sido registrado en UNQuivalencias, 
    
    Password: ${password}

    Saludos!
  `
});

const getName = number =>
  ({
    '1': '1 (uno)',
    '2': '2 (dos)',
    '3': '3 (tres)',
    '4': '4 (cuatro)',
    '5': '5 (cinco)',
    '6': '6 (seis)',
    '7': '7 (siete)',
    '8': '8 (ocho)',
    '9': '9 (nueve)',
    '10': '10 (diez)'
  }[number]);

exports.generateConsultToProfessorMail = (request, { email }, subject, file) => ({
  to: 'pasqupes12@gmail.com',
  subject: `[UNQ-EQV] Equivalencia de ${subject.dataValues.subject} (Estudiante: ${file.dataValues.name} ${file.dataValues.surname})`,
  text: `
    Estimados docentes,

    Por pedido de la Dirección, les envío el sgte. pedido de equivalencias para evaluar.

    El estudiante solicita ${subject.dataValues.subject} (UNQ),
    con la/s materia/s ${`${orderBy(get(request, ['dataValues', 'originSubjects'], []), 'id').map(
      originSubject =>
        `${get(originSubject, ['dataValues', 'subject'])} (${get(originSubject, [
          'dataValues',
          'university'
        ])})`
    )}`.replace(/,/g, ', ')}.

    Necesito que se logueen a este link ${config.common.api.frontUrl}/solicitud/${
    request.dataValues.id
  }/materia/${subject.dataValues.id} 
    con el mail ${email} como usuario e informarme si podemos o no dar la equivalencia. 

    Usualmente la Directora chequea que los contenidos mínimos estén en ambos programas, 
    pero si no están, deben informar si se da o no la equivalencia. 
    Adicionalmente les informo que su nota en la materias de origen fue: 
    ${`${orderBy(get(request, ['dataValues', 'originSubjects'], []), 'id').map(originSubject => {
      const mark = get(
        find(
          get(request, ['dataValues', 'originSubjectsInfo'], []),
          subjectInfo =>
            parseInt(get(subjectInfo, ['dataValues', 'subjectId'])) ===
            parseInt(get(originSubject, ['dataValues', 'id']))
        ),
        ['dataValues', 'mark']
      );
      return getName(mark) || mark;
    })}`.replace(/,/g, ', ')}.
    
    Cuando respondan, si no se la equivalencia, la razón tiene que ser sencilla. Con una frase es suficiente.
    
    Saludos y gracias
  `
});

exports.generateRecommendMail = ({ subjectUnqName, subjectNames }, email) => ({
  to: email,
  subject: `[UNQ-EQV] Recomendacion ${subjectUnqName}`,
  text: `
    Se ha rechazado la solicitud de equivalencia a la materia '${subjectUnqName}'.

    Se solicitan las siguientes materias para reabrir el expediente y poder aprobar la solicitud:

    ${subjectNames}.

    Saludos! `
});

exports.generateCodeMail = ({ email }, code) => ({
  to: email,
  subject: `[UNQ-EQV] Código de verificación`,
  text: `
    Utilice el código para reestablecer su contraseña.

    Código de verificación: ${code}

    Saludos! `
});

exports.generateNewPasswordMail = ({ email }, password) => ({
  to: email,
  subject: `[UNQ-EQV] Nueva contraseña`,
  text: `
    Se ha reestablecido su contraseña.

    Nueva contraseña: ${password}

    Saludos! `
});
