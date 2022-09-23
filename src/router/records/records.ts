import express from "express";
import recordModel from "../../db/models/record-db";
import certificator from "../../controller/records/modules/certification";
import model from "../../controller/records/modules/model";

const router = express.Router();

// /recordsに来たリクエストの処理
router
  .route("/")
  .get(async (req: express.Request, res: express.Response) => {
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
      const time = model.stringifyTime(record.time); // 文字列に変換
      const state = record.state;

      // pushが使用されていたのでコメントアウト、代わりに代入で処理
      // lintが起こったので一旦pushで
      // newRecords.push({ id, name, time, state });
      newRecords = [...newRecords, { id, name, time, state }];
    }

    console.log(newRecords);
    console.log("");
    // テンプレートエンジンに読み込ませる
    res.render("template", { record: newRecords });
  })
  .post(async (req: express.Request, res: express.Response) => {
    const body = req.body;

    const name = body.context;
    const pin = body.pin;
    // 名前の照合（cert:照合結果, message:表示させるメッセージ）
    const certData = await certificator.certificate(name, pin);
    // 照合失敗の場合
    if (!certData.cert) {
      // res.render("template", { record: newRecords, message: certData.message });
      // 上の形にすれば、ブラウザにメッセージが出力できそう
      res.redirect("/records");
      return;
    }

    // PINが合致した場合
    await recordModel.create(body.context, body.state);
    res.redirect("/records");
  });

export default router;
