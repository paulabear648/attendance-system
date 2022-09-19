import "reflect-metadata";
import { DataSource } from "typeorm";
import { Record } from "./entity/Record";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./dist/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Record],
  migrations: [],
  subscribers: [],
});
