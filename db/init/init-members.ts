// import memberModel from "../models/member-db";
import typeorm from "./init-orm";
import memberModel from "../models/member-db";
import recordModel from "../models/record-db";

(async () => {
  await typeorm.initMember();
  await typeorm.initRecord();
  
  // データの登録
  // ゼミ長・副ゼミ長を登録しております
  await memberModel.create(4, "田中", "0000");
  await memberModel.create(4, "大山", "0001");
  await memberModel.create(5, "佐藤", "0002");
  await memberModel.create(5, "山田", "0003");
  await memberModel.create(6, "鈴木", "0004");
  await memberModel.create(6, "岩田", "0005");

  // ログの登録(工数の都合で正規化されていません！)
  await recordModel.create("田中", "入室");
  await recordModel.create("大山", "入室");
  await recordModel.create("大山", "退室");
  await recordModel.create("岩田", "入室");
  await recordModel.create("佐藤", "入室");
  await recordModel.create("山田", "入室");
  await recordModel.create("田中", "退室");
  await recordModel.create("山田", "退室");
  await recordModel.create("佐藤", "退室");
  await recordModel.create("岩田", "退室");
  await recordModel.create("鈴木", "入室");
  await recordModel.create("鈴木", "退室");  
})()
  .then()
  .catch((error) => console.log(error));
