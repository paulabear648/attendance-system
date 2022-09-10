import express from "express";
const app = express();

app.use(express.raw({ type: "application/x-www-form-urlencoded" }));


app.get("/list", (req: express.Request, res: express.Response) => {
  res.send("Hello!");
})



// ルートにGETが来たらトップページへリダイレクト
app.get("/", (req: express.Request, res: express.Response) => {
  console.log("/");
  res.redirect("/list");
});

//  localhost 8080でサーバー
app.listen(8080, () => {});
