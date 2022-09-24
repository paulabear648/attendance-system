import memberModel from "../../db/models/member-db";
import sha256 from "./sha256";

// 照合結果に応じてcert, messageを返す
//   cert:    boolean -> 照合の結果を真偽値で返す
//   message: string  -> ブラウザに表示させるメッセージを返す
const certificate = async (
  name: string,
  pin: string
): Promise<{ cert: boolean; message: string }> => {
  // 名前がデータにあれば、そのデータを取得
  const member = await memberModel.read(name);

  // 名前がデータにない場合
  if (member === null) {
    console.log("cannot found name");
    console.log("");
    return { cert: false, message: "登録されていない名前です" };
  }

  // PINが一致しない場合
  else if (member.pin !== sha256(pin)) {
    console.log("do not correct PIN");
    console.log("");
    return { cert: false, message: "PINが正しくありません" };
  }

  // 正しく認証できた場合
  else {
    return { cert: true, message: "" };
  }
};

export default certificate;
