const {
  Sequelize: { Op }
} = require('../models');

exports.generateNewPassword = () =>
  Math.random()
    .toString(36)
    .slice(-10);

exports.generateNewUserMail = ({ email, password }) => ({
  to: email,
  subject: 'UNQuivalencias Registro',
  text: `
    Has sido registrado en UNQuivalencias, 
    
    Password: ${password}

    Saludos!
  `
});

exports.getPageParams = query => {
  const page = parseInt(query.page) || 0;
  const limit = parseInt(query.limit) || 0;
  const offset = (page - 1) * limit;
  return { page, limit, offset: offset < 0 ? 0 : offset };
};

exports.substring = field => field && { [Op.substring]: field };
