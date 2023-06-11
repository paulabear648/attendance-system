import memberModel from "../db/models/member-db";
import sha256 from "./sha256";

// 照合結果に応じてcert, messageを返す
//   cert:    boolean -> 照合の結果を真偽値で返す
//   message: string  -> ブラウザに表示させるメッセージを返す
const certificate = async (
  name: string,
  password: string
): Promise<{ cert: boolean; message: string }> => {
  // 名前がデータにあれば、そのデータを取得
  const member = await memberModel.read(name);

  // 名前がデータにない場合 or passwordが一致しない場合
  if (member === null || member.password !== sha256(password)) {
    console.log("do not correct password or name");
    console.log("");
    return { cert: false, message: "名前またはパスワードが正しくありません" };
  }

  // 正しく認証できた場合
  else {
    return { cert: true, message: "正常にログが追加されました" };
  }
};

export default certificate;
