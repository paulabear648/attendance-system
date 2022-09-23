import certificator from "./controller/records/modules/certification";
import memberModel from "./db/models/member-db";
import typeorm from "./db/init/init-orm";

beforeEach(async () => {});

afterAll(() => {
  console.log("Test is over");
});

describe("#1 nameとpinが真", () => {
  test("Jestのテスト", async () => {
    await typeorm.initMember(async () => {
      // データの登録
      await memberModel.create(6, "akito", "0000");
      await memberModel.create(6, "sousi", "0001");
      await memberModel.create(6, "fumito", "0002");
      await memberModel.create(6, "reishi", "0003");
      await memberModel.create(6, "ryo", "0004");
      await memberModel.create(6, "takeyama", "0005");
      await memberModel.create(6, "takahiro", "0006");
      await memberModel.create(6, "moti", "0007");
      await expect(await certificator.certificate("akito", "0000")).toBe({
        cert: true,
        message: "",
      });
      await expect(await certificator.certificate("sousi", "0001")).toBe({
        cert: true,
        message: "",
      });
      await expect(await certificator.certificate("fumito", "0002")).toBe({
        cert: true,
        message: "",
      });
      await expect(await certificator.certificate("reishi", "0003")).toBe({
        cert: true,
        message: "",
      });
      await expect(await certificator.certificate("ryo", "0004")).toBe({
        cert: true,
        message: "",
      });
      await expect(await certificator.certificate("takeyama", "0005")).toBe({
        cert: true,
        message: "",
      });
      await expect(await certificator.certificate("takahiro", "0006")).toBe({
        cert: true,
        message: "",
      });
      await expect(await certificator.certificate("moti", "0007")).toBe({
        cert: true,
        message: "",
      });
    });
  });
});
