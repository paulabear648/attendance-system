import { DataSource } from "typeorm";
import "reflect-metadata";

import { Member } from "./entity/member";
import { Record } from "./entity/record";

export const MemberDataSource = new DataSource({
  type: "sqlite",
  database: "./dist/member.sqlite",
  synchronize: true,
  logging: false,
  entities: [Member],
  migrations: [],
  subscribers: [],
});

export const RecordDataSource = new DataSource({
  type: "sqlite",
  database: "./dist/record.sqlite",
  synchronize: true,
  logging: false,
  entities: [Record],
  migrations: [],
  subscribers: [],
});
