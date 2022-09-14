import { AppDataSource } from "./data-source";
import { List } from "./entity/List";

const model = {
  getLists() {
    return AppDataSource.getRepository(List).find();
  },
};

export default model;
