import certificate from "../controller/inout-modules/cert";
import memberModel from "../db/models/member-db";
import typeorm from "../db/init/init-orm";

beforeAll(async () => {
  // console.log();
  await typeorm.initMember();

  // データの登録
  await memberModel.create(6, "akito", "0000");
  await memberModel.create(6, "sousi", "0001");
  await memberModel.create(6, "fumito", "0002");
  await memberModel.create(6, "reishi", "0003");
  await memberModel.create(6, "ryo", "0004");
  await memberModel.create(6, "takeyama", "0005");
  await memberModel.create(6, "takahiro", "0006");
  await memberModel.create(6, "moti", "0007");
});

afterAll(async () => {
  // await typeorm.destroyAll();
  console.log("Test is over");
});

describe("Test1:nameとpassが一致", () => {
  test("#1:akito", async () => {
    expect(await certificate("akito", "0000")).toStrictEqual({
      cert: true,
      message: "正常にログが追加されました",
    });
  });
  test("#2:sousi", async () => {
    expect(await certificate("sousi", "0001")).toStrictEqual({
      cert: true,
      message: "正常にログが追加されました",
    });
  });
  test("#3:fumito", async () => {
    expect(await certificate("fumito", "0002")).toStrictEqual({
      cert: true,
      message: "正常にログが追加されました",
    });
  });
  test("#4:reisi", async () => {
    expect(await certificate("reishi", "0003")).toStrictEqual({
      cert: true,
      message: "正常にログが追加されました",
    });
  });
  test("#5:ryo", async () => {
    expect(await certificate("ryo", "0004")).toStrictEqual({
      cert: true,
      message: "正常にログが追加されました",
    });
  });
  test("#6:takeyama", async () => {
    expect(await certificate("takeyama", "0005")).toStrictEqual({
      cert: true,
      message: "正常にログが追加されました",
    });
  });
  test("#7:takahiro", async () => {
    expect(await certificate("takahiro", "0006")).toStrictEqual({
      cert: true,
      message: "正常にログが追加されました",
    });
  });
  test("#8:moti", async () => {
    expect(await certificate("moti", "0007")).toStrictEqual({
      cert: true,
      message: "正常にログが追加されました",
    });
  });
});

describe("Test2:nameが一致するがpassは不一致", () => {
  test("#1:異なる数字", async () => {
    expect(await certificate("akito", "1000")).toStrictEqual({
      cert: false,
      message: "パスワードが正しくありません",
    });
  });
  test("#2:passが長い", async () => {
    expect(await certificate("sousi", "20000")).toStrictEqual({
      cert: false,
      message: "パスワードが正しくありません",
    });
  });
  test("#3:passが短い", async () => {
    expect(await certificate("fumito", "300")).toStrictEqual({
      cert: false,
      message: "パスワードが正しくありません",
    });
  });
  test("#4:アルファベット", async () => {
    expect(await certificate("reishi", "abcd")).toStrictEqual({
      cert: false,
      message: "パスワードが正しくありません",
    });
  });
  test("#5:英文", async () => {
    expect(await certificate("ryo", "not correct paswword")).toStrictEqual({
      cert: false,
      message: "パスワードが正しくありません",
    });
  });
  test("#6:記号文字", async () => {
    expect(
      await certificate("takeyama", "-=^~\\|@`[{}]:*;+_/?.<>,")
    ).toStrictEqual({
      cert: false,
      message: "パスワードが正しくありません",
    });
  });
  test("#7:空", async () => {
    expect(await certificate("takahiro", "")).toStrictEqual({
      cert: false,
      message: "パスワードが正しくありません",
    });
  });
  test("#8:URL", async () => {
    expect(await certificate("moti", "http://localhost:8080")).toStrictEqual({
      cert: false,
      message: "パスワードが正しくありません",
    });
  });
});

describe("Test3:nameが一致するがpassは不一致", () => {
  test("#1:ando", async () => {
    expect(await certificate("ando", "0000")).toStrictEqual({
      cert: false,
      message: "登録されていない名前です",
    });
  });
  test("#2:iguchi", async () => {
    expect(await certificate("iguchi", "0001")).toStrictEqual({
      cert: false,
      message: "登録されていない名前です",
    });
  });
  test("#3:iwata", async () => {
    expect(await certificate("iwata", "0002")).toStrictEqual({
      cert: false,
      message: "登録されていない名前です",
    });
  });
  test("#4:ohashi", async () => {
    expect(await certificate("ohashi", "0003")).toStrictEqual({
      cert: false,
      message: "登録されていない名前です",
    });
  });
  test("#5:takeuchi", async () => {
    expect(await certificate("takeuchi", "0004")).toStrictEqual({
      cert: false,
      message: "登録されていない名前です",
    });
  });
  test("#6:yutaro", async () => {
    expect(await certificate("yutaro", "0005")).toStrictEqual({
      cert: false,
      message: "登録されていない名前です",
    });
  });
  test("#7:nakamura", async () => {
    expect(await certificate("nakamura", "0006")).toStrictEqual({
      cert: false,
      message: "登録されていない名前です",
    });
  });
  test("#8:yu", async () => {
    expect(await certificate("yu", "0007")).toStrictEqual({
      cert: false,
      message: "登録されていない名前です",
    });
  });
});

describe("Test4:名前に漢字かな", () => {
  test("#1:新たにデータを作り安藤を呼ぶ", async () => {
    await memberModel.create(6, "安藤", "0001");
    expect(await certificate("安藤", "0001")).toStrictEqual({
      cert: true,
      message: "正常にログが追加されました",
    });
  });
  test("#2:データを作らずに餅を呼ぶ", async () => {
    expect(await certificate("餅", "0007")).toStrictEqual({
      cert: false,
      message: "登録されていない名前です",
    });
  });
});
