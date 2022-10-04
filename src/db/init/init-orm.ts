import { RecordDataSource, MemberDataSource } from "../sources/data-source";

const typeorm = {
  // typeormの起動
  async init() {
    await this.initRecord();
    await this.initMember();
  },

  // Recordのみの起動
  // 引数にテストデータを作成するasync関数をセットする
  // （db/init/init-members.tsを参照）
  async initRecord() {
    await RecordDataSource.initialize();
  },

  // Memberのみの起動
  // 仕様はinitRecordと同じ
  async initMember() {
    await MemberDataSource.initialize();
  },

  async destroyAll(){
    await MemberDataSource.destroy();
    await RecordDataSource.destroy();
    console.log("database is destroyed.");
  }
};

export default typeorm;
