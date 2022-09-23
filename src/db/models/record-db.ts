import { RecordDataSource } from "../sources/data-source";
import { Record } from "../entity/record";

const recordModel = {
  async create(name: string, state: string) {
    const record = new Record();
    record.name = name;

    record.time = new Date();

    record.state = state;

    await RecordDataSource.manager.save(record);

    console.log(`Saved a new user with id: ${String(record.id.toString())}`);
  },

  async readAllDesc() {
    return await RecordDataSource.getRepository(Record).find({
      order: {
        id: "DESC",
      },
    });
  },
};

export default recordModel;
