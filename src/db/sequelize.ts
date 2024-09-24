import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialectOptions: {
    useUTC: false,
    timezone: "UTC",
  },
  timezone: "UTC",
  dialect: "postgres",
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
});
