import certificate from "./controller/inout-modules/cert";
import memberModel from "./db/models/member-db";
import typeorm from "./db/init/init-orm";

beforeEach(async () => {});

afterAll(() => {
  console.log("Test is over");
});

describe("#1 nameとpasswordが真", () => {
  test("Jestのテスト", async () => {
    typeorm.initMember(async () => {
      // データの登録
      await memberModel.create(6, "akito", "0000");
      await memberModel.create(6, "sousi", "0001");
      await memberModel.create(6, "fumito", "0002");
      await memberModel.create(6, "reishi", "0003");
      await memberModel.create(6, "ryo", "0004");
      await memberModel.create(6, "takeyama", "0005");
      await memberModel.create(6, "takahiro", "0006");
      await memberModel.create(6, "moti", "0007");

      expect(await certificate("akito", "0000")).toBe({
        cert: true,
        message: "",
      });
      expect(await certificate("sousi", "0001")).toBe({
        cert: true,
        message: "",
      });
      expect(await certificate("fumito", "0002")).toBe({
        cert: true,
        message: "",
      });
      expect(await certificate("reishi", "0003")).toBe({
        cert: true,
        message: "",
      });
      expect(await certificate("ryo", "0004")).toBe({
        cert: true,
        message: "",
      });
      expect(await certificate("takeyama", "0005")).toBe({
        cert: true,
        message: "",
      });
      expect(await certificate("takahiro", "0006")).toBe({
        cert: true,
        message: "",
      });
      expect(await certificate("moti", "0007")).toBe({
        cert: true,
        message: "",
      });
    });
  });
});
