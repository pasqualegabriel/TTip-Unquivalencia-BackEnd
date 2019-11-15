exports.mapNewFile = ({ fileNumber, yearNote, mail, name, surname, dni }) => ({
  fileNumber,
  yearNote,
  mail,
  name,
  surname,
  dni
});

exports.mapFileByFileNumber = file => {
  const request = file.dataValues.requests.length ? file.dataValues.requests[0].dataValues : file.dataValues;
  delete file.dataValues.requests;
  return { ...file.dataValues, ...request };
};

exports.mapLetter = file => file;
