const path = require('path');
// Isso garante que ele ache o .env mesmo rodando de dentro da pasta config
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true // Ative o log para vermos o IP no terminal se falhar
  }
};