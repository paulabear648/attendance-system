import express from "express";
import recordModel from "../../db/models/record-db";
import certificate from "../inout-modules/cert";
import stringifyTime from "../inout-modules/stringify-time";

const ctrl = {
  async get(req: express.Request, res: express.Response): Promise<void> {
    // Recordテーブル内のすべてのデータを取得
    const records = await recordModel.readAllDesc();

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

    console.log(newRecords);
    console.log("");
    // テンプレートエンジンに読み込ませる
    res.render("inout/records", { record: newRecords });
  },

  async post(req: express.Request, res: express.Response): Promise<void> {
    const body = req.body;

    const name = body.context;
    const password = body.password;
    // 名前の照合（cert:照合結果, message:表示させるメッセージ）
    const certData = await certificate(name, password);
    // 照合成功の場合
    if (certData.cert) {
      await recordModel.create(body.context, body.state);
      await req.flash("success", certData.message);
    } else {
      await req.flash("error", certData.message);
    }

    res.redirect("/inout");
  },
};

export default ctrl;
