const isValidName = (name) => {
  if (!name) {
    return { 
      status: 'BAD_REQUEST', 
      message: '"name" is required', 
    };
  }

  if (name.length < 5) {
    return { 
      status: 'INVALID_VALUE', 
      message: '"name" length must be at least 5 characters long', 
    };
  }
};

module.exports = {
  isValidName,
};