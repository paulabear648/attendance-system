import express from "express";
import recordModel from "../../../db/models/record-db";
import certificate from "../../../modules/cert";
import stringifyTime from "../../../modules/stringify-time";

const ctrl = {
  async get(req: express.Request, res: express.Response): Promise<void> {
    // クエリパラメータからlimitの取得
    const limit: number = isNaN(Number(req.query["limit"]))
      ? 0
      : Number(req.query["limit"]);
    // クエリパラメータからoffsetの取得
    const offset: number = isNaN(Number(req.query["offset"]))
      ? 0
      : Number(req.query["offset"]);
    // クエリパラメータからisDesc(降順にするかどうか)の取得
    const isDesc: boolean = Boolean(req.query["desc"]);

    // Recordテーブル内のすべてのデータを取得
    const records = await recordModel.read(limit, offset, isDesc);

    // エラーが取れないためpushメソッドを使用
    // const newRecords = [];
    let newRecords: Array<{
      id: number;
      name: string;
      time: string;
      state: string;
    }> = [];

    for (const record of records) {
      const id = record.id;
      const name = record.name;
      const time = stringifyTime(record.time); // 文字列に変換
      const state = record.state;

      // pushが使用されていたのでコメントアウト、代わりに代入で処理
      // lintが起こったので一旦pushで
      // newRecords.push({ id, name, time, state });
      newRecords = [...newRecords, { id, name, time, state }];
    }

    console.log("--- new records ---");
    console.log(newRecords);
    console.log("-------------------");

    // 指定されたレコードをJSON形式で返す
    res.json(newRecords);
  },

  async post(req: express.Request, res: express.Response): Promise<void> {
    const body = req.body;

    const name = body.context;
    const password = body.password;
    const state = body.state;

    // 名前の照合（cert:照合結果, message:表示させるメッセージ）
    const certData = await certificate(name, password);
    // 照合成功の場合
    if (certData.cert) {
      await recordModel.create(name, state);
    }

    res.json({ message: certData.message, cert: certData.cert });
  },
};

export default ctrl;
