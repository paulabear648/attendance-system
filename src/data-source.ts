import "reflect-metadata";
import { DataSource } from "typeorm";
import { Record } from "./entity/Record";
import { Members } from "./entity/Members";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./dist/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Record, Members],
  migrations: [],
  subscribers: [],
});
