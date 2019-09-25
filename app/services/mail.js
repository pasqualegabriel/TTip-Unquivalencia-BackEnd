const nodemailer = require('nodemailer'),
  {
    common: {
      mail: { user, pass }
    }
  } = require('../../config');

module.exports = ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass
    }
  });
  const mailOptions = {
    from: user,
    to,
    subject,
    text
  };
  return new Promise((resolve, reject) =>
    transporter.sendMail(mailOptions, (error, info) => (error ? reject(error) : resolve(info)))
  );
};
