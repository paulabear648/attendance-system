import certificate from "../controller/inout-modules/cert";
import memberModel from "../db/models/member-db";
import typeorm from "../db/init/init-orm";

beforeAll(async () => {
  await typeorm.initMember();

  // データの登録
  await memberModel.create(6, "akito", "0000");
  await memberModel.create(6, "sousi", "Az09");
  await memberModel.create(6, "fumito", "");
  await memberModel.create(6, "レイシ", "0003");
});

afterAll(() => {
  console.log("Test is over");
});

describe("#1 nameとpasswordが真", () => {
  test("Jestのテスト", async () => {
    expect(await certificate("akito", "0000")).toStrictEqual({
      cert: true,
      message: "",
    });
    expect(await certificate("sousi", "Az09")).toStrictEqual({
      cert: true,
      message: "",
    });
    expect(await certificate("fumito", "")).toStrictEqual({
      cert: true,
      message: "",
    });
    expect(await certificate("レイシ", "0003")).toStrictEqual({
      cert: true,
      message: "",
    });
    expect(await certificate("ryo", "0000")).not.toStrictEqual({
      cert: true,
      message: "",
    });
    expect(await certificate("akito", "9999")).not.toStrictEqual({
      cert: true,
      message: "",
    });
  });
});
