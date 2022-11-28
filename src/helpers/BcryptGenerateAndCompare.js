const bcrypt = require('bcryptjs');

const generateBcryptHash = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

const compareBcryptHash = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = {
  generateBcryptHash,
  compareBcryptHash,
};
