// model
const User = require('../models/User');

const { generateJWTToken } = require('../helpers/JWTGenerateAndCompare');
const {
  generateBcryptHash,
  compareBcryptHash,
} = require('../helpers/BcryptGenerateAndCompare');

const register = async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword } = req.body;

  if (!firstname) {
    res.status(422).json({
      status: 'fail',
      message: 'O nome é obrigatório.',
    });
    return;
  }

  if (!lastname) {
    res.status(422).json({
      status: 'fail',
      message: 'O sobrenome é obrigatório.',
    });
    return;
  }

  if (!email) {
    res.status(422).json({
      status: 'fail',
      message: 'O email é obrigatório.',
    });
    return;
  }

  if (!password) {
    res.status(422).json({
      status: 'fail',
      message: 'A senha é obrigatório.',
    });
    return;
  }

  if (!confirmpassword) {
    res.status(422).json({
      status: 'fail',
      message: 'A confirmação de senha é obrigatório.',
    });
    return;
  }

  if (password !== confirmpassword) {
    res.status(422).json({
      status: 'fail',
      message: 'A senha e confirmação de senha devem ser idênticas.',
    });
    return;
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({
      status: 'fail',
      message: 'Email já cadastrado no sistema. Por favor, insira outro email.',
    });
    return;
  }

  try {
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: await generateBcryptHash(password),
    });

    res.status(200).json({
      status: 'success',
      message: 'Usuário criado com sucesso!',
      token: generateJWTToken(newUser._id),
    });
    return;
  } catch (error) {
    res.status(421).json({
      status: 'fail',
      message:
        'Ocorreu um erro em criar usuário. Por favor tente novamente mais tarde.',
    });
    return;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(422).json({
      status: 'fail',
      message: 'O email é obrigatório.',
    });
    return;
  }

  if (!password) {
    res.status(422).json({
      status: 'fail',
      message: 'A senha é obrigatório.',
    });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      status: 'fail',
      message: 'Usuário ou senha inválida.',
    });
    return;
  }

  const verifiedPassword = await compareBcryptHash(password, user.password);

  if (!verifiedPassword) {
    res.status(422).json({
      status: 'fail',
      message: 'Usuário ou senha inválida.',
    });
    return;
  }

  res.status(200).json({
    _id: user._id,
    status: 'success',
    profileImage: user.profileImage,
    token: generateJWTToken(user._id),
  });
  return;
};

const update = async (req, res) => {
  const { firstname, lastname, password } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  if (firstname) {
    user.firstname = firstname;
  }

  if (lastname) {
    user.lastname = lastname;
  }

  if (password) {
    user.password = await generateBcryptHash(password);
  }

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Usuário atualizado com sucesso!',
  });
};

module.exports = {
  register,
  login,
  update,
};
