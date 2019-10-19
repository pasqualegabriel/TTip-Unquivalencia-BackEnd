exports.logInSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
};

exports.userSchema = {
  type: 'object',
  required: ['name', 'lastName', 'email', 'role'],
  properties: {
    name: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    role: {
      type: 'string'
    }
  }
};

exports.fileSchema = {
  type: 'object',
  required: ['fileNumber', 'requests'],
  properties: {
    fileNumber: {
      type: 'string'
    },
    requests: {
      type: 'array'
    }
  }
};
