import express from "express";
import session from "express-session";
import { flash } from "express-flash-message";

import typeorm from "../db/init/init-orm";

import api from "./router/api";
import pages from "./router/pages";

const app = express();

//
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(express.static("./dist/public"));
app.use(flash());

// API
app.use("/api", api);

// ページ
app.use("/", pages);

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

export default app;
