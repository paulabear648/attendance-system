import express from "express";
const app = express();

//pugの初期設定など
const pug = require("pug");

app.set("view engine","pug");
app.set("views","./src/views")
app.use(express.raw({ type: "application/x-www-form-urlencoded" }));

app.get("/list", (req: express.Request, res: express.Response) => {
  res.render("test",{name: "yu"});
});

// ルートにGETが来たらトップページへリダイレクト
app.get("/", (req: express.Request, res: express.Response) => {
  console.log("/");
  res.redirect("/list");
});

//  localhost 8080でサーバー
app.listen(8080, () => {});
