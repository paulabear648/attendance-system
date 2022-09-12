import "reflect-metadata";
import { DataSource } from "typeorm";
import { List } from "./entity/List";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/entity/List.ts",
  synchronize: true,
  logging: false,
  entities: [List],
  migrations: [],
  subscribers: [],
});
