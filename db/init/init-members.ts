// import memberModel from "../models/member-db";
import typeorm from "./init-orm";

(async () => {
  await typeorm.initMember();
  // データの登録
  /*
  await memberModel.create(6, "akito", "0000");
  await memberModel.create(6, "sousi", "0001");
  await memberModel.create(6, "fumito", "0002");
  await memberModel.create(6, "reishi", "0003");
  await memberModel.create(6, "ryo", "0004");
  await memberModel.create(6, "takeyama", "0005");
  await memberModel.create(6, "takahiro", "0006");
  await memberModel.create(6, "moti", "0007");
  */
})()
  .then()
  .catch((error) => console.log(error));
