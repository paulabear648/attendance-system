import express from "express";

import typeorm from "./db/init/init-orm";

import records from "./router/records/records";

const app = express();
const PORT = 8080;

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.raw({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(express.static("./dist/public"));

app.use("/records", records);

// typeormの起動
typeorm.init();

app.get("/", (req: express.Request, res: express.Response) => {
  console.log("/");
  res.redirect("/records");
});

//  localhost 8080でサーバー
app.listen(PORT, () => {
  console.log(`attendance system running on ${PORT}`);
});
