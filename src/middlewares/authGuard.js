const User = require('../models/User');

const { verifyJWTToken } = require('../helpers/JWTGenerateAndCompare');

const authGuard = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Acesso negado!',
    });
  }

  try {
    const verified = verifyJWTToken(token);

    req.user = await User.findById(verified.id).select('-password');

    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'O Token é inválido!',
    });
  }
};

module.exports = authGuard;
