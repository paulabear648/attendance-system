import { Members } from "./entity/Members";
import { MembersDataSource } from "./data-source";

const certificator = {
  // 照合結果に応じてcert, messageを返す
  //   cert:    boolean -> 照合の結果を真偽値で返す
  //   message: string  -> ブラウザに表示させるメッセージを返す

  async certificate(name: string, pin: string) {
    // 名前がデータにあれば、そのデータを取得
    const member = await MembersDataSource.getRepository(Members)
      .createQueryBuilder("Members")
      .where("Members.name = :name", { name })
      .getOne();

    // 名前がデータにない場合
    if (member === null) {
      console.log("cannot found name");
      console.log("");
      return { cert: false, message: "登録されていない名前です" };
    }

    // PINが一致しない場合
    else if (member.pin !== pin) {
      console.log("do not collect PIN");
      console.log("");
      return { cert: false, message: "PINが正しくありません" };
    }

    // 正しく認証できた場合
    else {
      return { cert: true, message: "" };
    }
  },
};

export default certificator;
