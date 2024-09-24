const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "127.0.0.1",
    dialect: "postgres",
    port: "5431",
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "127.0.0.1",
    dialect: "postgres",
    port: "5431",
  },
};
