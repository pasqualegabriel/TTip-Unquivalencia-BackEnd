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
