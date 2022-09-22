import express from "express";
import { RecordDataSource } from "../../db/sources/data-source";
import { Record } from "../../db/entity/record";
import certificator from "../../controller/records/modules/certification";
import model from "../../controller/records/modules/model";

const router = express.Router();

// /recordsに来たリクエストの処理
router
  .route("/")
  .get(async (req: express.Request, res: express.Response) => {
    // Recordテーブル内のすべてのデータを取得
    const records = await model.getRecords();

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

    // データを保持し、ターミナルにidを表示
    const record = new Record();

    record.name = body.context;

    // ここから日付表示用の処理
    const date = new Date(); // dateはDate型
    record.time = date;
    // ここまで

    record.state = body.state;

    // データを保存した後、/recordsにリダイレクト
    await RecordDataSource.manager.save(record);

    console.log(`Saved a new user with id: ${String(record.id.toString())}`); // recordにsaveしたあと、idに値が入るため、ここでconsole.log

    res.redirect("/records");
  });

export default router;
