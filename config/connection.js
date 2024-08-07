// Imort sequelize
const Sequelize = require('sequelize');
// Import dotenv
require('dotenv').config();

// Allows for enviornmental variables to be used
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );

  // Export sequelize
module.exports = sequelize;
