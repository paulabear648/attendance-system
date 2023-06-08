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

  /*
   * @limit 取得する個数
   * @offset 取得し始める番号 
   * @isDesc 降順で結果を返すかどうか
   */

  async read(limit: number, offset: number, isDesc: Boolean) {
    limit = limit | 0;
    offset = offset | 0;
    const order = isDesc ? "DESC" : "ASC";
    return await RecordDataSource.getRepository(Record).find({
      order: {
        id: order,
      },
      skip: offset,
      take: limit,
    });
  },
};

export default recordModel;
