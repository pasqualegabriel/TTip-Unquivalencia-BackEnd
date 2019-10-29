const { subject: Subject } = require('../models');

exports.createSubject = subject => Subject.create(subject);
