import { AppDataSource } from "./data-source";
import { Record } from "./entity/Record";

const model = {
  getRecords() {
    return AppDataSource.getRepository(Record).find({
      order: {
        id: "DESC",
      },
    });
  },
};

export default model;
