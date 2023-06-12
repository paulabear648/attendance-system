// import memberModel from "../models/member-db";
import typeorm from "./init-orm";
import memberModel from "../models/member-db";
import recordModel from "../models/record-db";

(async () => {
  await typeorm.initMember();
  await typeorm.initRecord();
  
  // データの登録
  // ゼミ長・副ゼミ長を登録しております
  await memberModel.create(4, "阿部", "0000");
  await memberModel.create(4, "平山", "0001");
  await memberModel.create(5, "杉田", "0002");
  await memberModel.create(5, "松本", "0003");
  await memberModel.create(6, "竹山", "0004");
  await memberModel.create(6, "大橋", "0005");

  // ログの登録(工数の都合で正規化されていません！)
  await recordModel.create("阿部", "入室");
  await recordModel.create("平山", "入室");
  await recordModel.create("平山", "退室");
  await recordModel.create("大橋", "入室");
  await recordModel.create("杉田", "入室");
  await recordModel.create("松本", "入室");
  await recordModel.create("阿部", "退室");
  await recordModel.create("松本", "退室");
  await recordModel.create("杉田", "退室");
  await recordModel.create("大橋", "退室");
  await recordModel.create("竹山", "入室");
  await recordModel.create("竹山", "退室");  
})()
  .then()
  .catch((error) => console.log(error));
