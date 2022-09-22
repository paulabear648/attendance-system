// import { Member } from "../entity/member";
import { MemberDataSource } from "../sources/data-source";
import memberModel from "../models/member-db";
// import typeorm from "./init-orm";

// typeorm.init();

MemberDataSource.initialize()
  .then(async () => {
    // データの登録
    await memberModel.create("akito", "0000");
    await memberModel.create("sousi", "0001");
    await memberModel.create("fumito", "0002");
    await memberModel.create("reishi", "0003");
    await memberModel.create("ryo", "0004");
    await memberModel.create("takeyama", "0005");
    await memberModel.create("takahiro", "0006");
    await memberModel.create("moti", "0007");
  })
  .catch((error) => console.log(error));
