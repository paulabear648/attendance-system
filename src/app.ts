import { AppDataSource } from "./data-source";
import { List } from "./entity/List";
import express from "express";
import model from "./model";
const app = express();
const qs = require("qs");

// pugの初期設定など
const pug = require("pug");

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.raw({ type: "application/x-www-form-urlencoded" }));
app.use(express.urlencoded({ extended: true }));

// /listに対してGETリクエストが来た際の処理
app.get("/list", async function (req: express.Request, res: express.Response) {
  // Listテーブル内のすべてのデータを取得
  const lists = await model.getLists();
  console.log(lists);
  // テンプレートエンジンに読み込ませる
  res.render("template", { list: lists });
});

// /listに対してPOSTリクエストが来た際の処理
app.post("/list", (req: express.Request, res: express.Response) => {
  // 送られてきたデータをオブジェクト型に変換
  const body = req.body.toString("utf8");
  const params = qs.parse(body);

  // データを保持し、ターミナルにidを表示
  const list = new List();
  list.name = params.context;
  // ここから日付表示用の処理
  const date = new Date();
  console.log(date.toString());
  const dayOfWeek = date.getDay(); //getDayメソッドは数字を返すため、
  const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek]; // ここで曜日を日本語表記に変換する
  // Date()で表示される時間は見づらかったため、見やすく表示。この部分は、関数化し、Modelにやらせたほうが良いかも
  list.time =
    date.getFullYear().toString() +
    "年" +
    (date.getMonth() + 1).toString() +
    "月" +
    date.getDate().toString() +
    "日（" +
    dayOfWeekStr +
    "）" +
    date.getHours().toString() +
    "：" +
    date.getMinutes().toString() +
    "：" +
    date.getSeconds().toString();
  list.state = params.state;

  // データを保存した後、/listにリダイレクト
  (async () => {
    await AppDataSource.manager.save(list);
    console.log("Saved a new user with id: " + list.id); // listにsaveしたあと、idに値が入るため、ここでconsole.log
    res.redirect("/list");
  })();
});

// ルートにGETが来たらトップページへリダイレクト
app.get("/", (req: express.Request, res: express.Response) => {
  console.log("/");
  res.redirect("/list");
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
