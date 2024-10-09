import { Sequelize } from "sequelize";
import { exec } from "child_process";

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

export const runMigrations = async () => {
  console.log("[DB]: Run migrations");
  await new Promise((resolve, reject) => {
    const migrate = exec(
      `npx sequelize db:migrate --env ${process.env.NODE_ENV}`,
      { env: process.env },
      (err) =>
        err ? reject(err) : resolve(() => console.log("migrations completed")),
    );

    if (migrate.stdout && migrate.stderr) {
      // Forward stdout+stderr to this process
      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    }
  });
  console.log("[DB]: Migrations successfully done");
};
