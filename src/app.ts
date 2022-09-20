import express from "express";

import ormInit from "./orminit";

import records from "./router/records";

const app = express();
const PORT = 8080;

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.raw({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.use("/records", records);

// typeormの起動
ormInit.init();

//  localhost 8080でサーバー
app.listen(PORT, () => {
  console.log(`attendance system running on ${PORT}`);
});
