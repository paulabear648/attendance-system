import express from "express";

import { AppDataSource } from "./data-source";
import { List } from "./entity/List";
import model from "./model";

const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.raw({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// /recordsに対してGETリクエストが来た際の処理
app.get("/records", async (req: express.Request, res: express.Response) => {
  // Listテーブル内のすべてのデータを取得
  const lists = await model.getLists();

  //pushメソッドを使用しないためにconstをvarに書き換え
  //const nerRecords = [];
  var newRecords: {
    id: number;
    name: string;
    time: string;
    state: string;
  }[] = [];

  for (const list of lists) {
    const id = list.id;
    const name = list.name;

    const dayOfWeek = list.time.getDay(); //getDayメソッドは数字を返すため、
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek]; // ここで曜日を日本語表記に変換する

    // Date()で表示される時間は見づらかったため、見やすく表示。この部分は、関数化し、Modelにやらせたほうが良いかも
    const time =
      list.time.getFullYear().toString() +
      "年" +
      (list.time.getMonth() + 1).toString() +
      "月" +
      list.time.getDate().toString() +
      "日（" +
      dayOfWeekStr +
      "）" +
      list.time.getHours().toString() +
      "：" +
      list.time.getMinutes().toString() +
      "：" +
      list.time.getSeconds().toString();

    const state = list.state;

    //pushが使用されていたのでコメントアウト、代わりに代入で処理
    //newRecords.push({ id, name, time, state });
    newRecords = [...newRecords, { id, name, time, state }];
  }

  console.log(newRecords);
  // テンプレートエンジンに読み込ませる
  res.render("template", { list: newRecords });
});

// /recordsに対してPOSTリクエストが来た際の処理
app.post("/records", async (req: express.Request, res: express.Response) => {
  const body = req.body;

  // データを保持し、ターミナルにidを表示
  const list = new List();

  list.name = body.context;

  // ここから日付表示用の処理
  const date = new Date(); // dateはDate型
  list.time = date;
  // ここまで

  list.state = body.state;

  // データを保存した後、/recordsにリダイレクト
  await AppDataSource.manager.save(list);
  console.log("Saved a new user with id: " + list.id); // listにsaveしたあと、idに値が入るため、ここでconsole.log
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

//  localhost 8080でサーバー
app.listen(8080, () => {});
