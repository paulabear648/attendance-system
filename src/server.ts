import app from "./app";

const PORT = 8080;

//  localhost 8080でサーバー
app.listen(PORT, () => {
  console.log(`attendance system running on ${PORT}`);
});
