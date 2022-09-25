import express from "express";

import typeorm from "./db/init/init-orm";

import inout from "./router/inout";
import members from "./router/members";

const app = express();
const PORT = 8080;

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.raw({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(express.static("./dist/public"));

// API設計
app.use("/inout", inout);
app.use("/members", members);

// typeormの起動
(async () => {
  await typeorm.init();
})()
  .then()
  .catch((error) => console.log(error));

// ルートトップに来たらリダイレクト
app.get("/", (req: express.Request, res: express.Response) => {
  console.log("/");
  res.redirect("/inout");
});

//  localhost 8080でサーバー
app.listen(PORT, () => {
  console.log(`attendance system running on ${PORT}`);
});
