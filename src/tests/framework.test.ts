import request from "supertest";
import app from "../app";

describe("Frameworkのテスト", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  test("'/'でリダイレクトする", async () => {
    return await request(app).get("/").expect(302);
  });

  test("'/inout'でアクセスする", async () => {
    return await request(app)
      .get("/inout")
      .expect("Content-Type", "text/html; charset=utf-8") // htmlが帰ってくる
      .expect(200);
  });
});
