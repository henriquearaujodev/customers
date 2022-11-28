const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const generateJWTToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '7d',
  });
};

const verifyJWTToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateJWTToken,
  verifyJWTToken,
};
