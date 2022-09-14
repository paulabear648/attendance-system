import { AppDataSource } from "./data-source";
import { List } from "./entity/List";

const model = {
  getLists() {
    return AppDataSource.getRepository(List).find({
      order: {
        id: "DESC",
      },
    });
  },
};

export default model;
