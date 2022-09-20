import express from "express";

import { AppDataSource } from "./data-source";
import { MembersDataSource } from "./data-source";
import { Record } from "./entity/Record";
import certificator from "./certification";
import model from "./model";

const app = express();
const PORT = 8080;

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.raw({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// /recordsに対してGETリクエストが来た際の処理
app.get("/records", async (req: express.Request, res: express.Response) => {
  // Recordテーブル内のすべてのデータを取得
  const records = await model.getRecords();

  //pushメソッドを使用しないためにconstをvarに書き換え
  //const newRecords = [];
  var newRecords: {
    id: number;
    name: string;
    time: string;
    state: string;
  }[] = [];

  for (const record of records) {
    const id = record.id;
    const name = record.name;
    const time = model.stringifyTime(record.time); // 文字列に変換
    const state = record.state;

    //pushが使用されていたのでコメントアウト、代わりに代入で処理
    //newRecords.push({ id, name, time, state });
    newRecords = [...newRecords, { id, name, time, state }];
  }

  console.log(newRecords);
  console.log("");
  // テンプレートエンジンに読み込ませる
  res.render("template", { record: newRecords });
});

// /recordsに対してPOSTリクエストが来た際の処理
app.post("/records", async (req: express.Request, res: express.Response) => {
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
  await AppDataSource.manager.save(record);
  console.log("Saved a new user with id: " + record.id); // recordにsaveしたあと、idに値が入るため、ここでconsole.log
  res.redirect("/records");
});

// ルートにGETが来たらトップページへリダイレクト
app.get("/", (req: express.Request, res: express.Response) => {
  console.log("/");
  res.redirect("/records");
});

// typeormの起動
AppDataSource.initialize()
  .then(async () => {
    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));

MembersDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));

//  localhost 8080でサーバー
app.listen(PORT, () => {
  console.log(`attendance system running on ${PORT}`);
});
