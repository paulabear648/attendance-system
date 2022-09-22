import { RecordDataSource, MemberDataSource } from "../sources/data-source";

const typeorm = {
  // typeormの起動
  // もっと抽象化できそう
  init() {
    RecordDataSource.initialize()
      .then()
      .catch((error) => console.log(error));

    MemberDataSource.initialize()
      .then()
      .catch((error) => console.log(error));
  },
};

export default typeorm;
