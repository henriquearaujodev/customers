const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const connection = async () => {
  try {
    await new mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@cluster0.uoidvmu.mongodb.net/?retryWrites=true&w=majority`,
    );
    console.log('Banco de dados conectado com sucesso!');
  } catch (error) {
    console.log('Erro ao conectar');
  }
};

connection();

module.exports = connection;
