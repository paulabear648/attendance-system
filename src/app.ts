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
  list.state = params.state;
  console.log("Saved a new user with id: " + list.id);

  // データを保存した後、/listにリダイレクト
  (async () => {
    await AppDataSource.manager.save(list);
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
