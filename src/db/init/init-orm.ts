import { RecordDataSource, MemberDataSource } from "../sources/data-source";

const typeorm = {
  // typeormの起動
  init() {
    this.initRecord(async () => {});
    this.initMember(async () => {});
  },

  // Recordのみの起動
  // 引数にテストデータを作成するasync関数をセットする
  // （db/init/init-members.tsを参照）
  initRecord(func: () => Promise<void>) {
    RecordDataSource.initialize()
      .then(func)
      .catch((error) => console.log(error));
  },

  // Memberのみの起動
  // 仕様はinitRecordと同じ
  initMember(func: () => Promise<void>) {
    MemberDataSource.initialize()
      .then(func)
      .catch((error) => console.log(error));
  },
};

export default typeorm;
