import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;

const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST || "localhost",
  port: DB_PORT ? parseInt(DB_PORT) : 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["./src/entities/*.ts"],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("AppDataSource initialized");
  })
  .catch((error) => {
    console.log(error);
  });

export default AppDataSource;
