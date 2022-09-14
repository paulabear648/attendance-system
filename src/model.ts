import { AppDataSource } from "./data-source";
import { List } from "./entity/List";

const model = {
  getLists() {
    const lists = AppDataSource.getRepository(List).find();
    console.log(lists);
    return lists;
  },
};

export default model;
