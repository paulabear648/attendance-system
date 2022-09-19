import "reflect-metadata";
import { DataSource } from "typeorm";
import { Record } from "./entity/Record";
import { Members } from "./entity/Members";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./dist/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Record],
  migrations: [],
  subscribers: [],
});

export const MembersDataSource = new DataSource({
  type: "sqlite",
  database: "./dist/memberdb.sqlite",
  synchronize: true,
  logging: false,
  entities: [Members],
  migrations: [],
  subscribers: [],
});
