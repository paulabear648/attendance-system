import { AppDataSource } from "./data-source";
import { List } from "./entity/List";
import express from "express";
const app = express();

//pugの初期設定など
const pug = require("pug");

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.raw({ type: "application/x-www-form-urlencoded" }));

app.get("/list", async function (req: express.Request, res: express.Response) {
  const lists = await AppDataSource.getRepository(List).find();
  console.log(lists);
  res.render("template", { name: "yu" });
});

// ルートにGETが来たらトップページへリダイレクト
app.get("/", (req: express.Request, res: express.Response) => {
  console.log("/");
  res.redirect("/list");
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const list = new List();
    list.name = "岩田";
    list.state = "入室";
    await AppDataSource.manager.save(list);
    console.log("Saved a new user with id: " + list.id);

    console.log("Loading users from the database...");
    const lists = await AppDataSource.manager.find(List);
    console.log("Loaded users: ", lists);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));

//  localhost 8080でサーバー
app.listen(8080, () => {});
