import { MembersDataSource } from "./data-source";
import { Members } from "./entity/Members";

// データの登録を行う関数
async function resisterMember(name: string, pin: string) {
  const member = new Members();
  member.name = name;
  member.pin = pin;
  await MembersDataSource.getRepository(Members).save(member);
}

MembersDataSource.initialize()
  .then(async () => {
    // データの登録
    await resisterMember("akito", "0000");
    await resisterMember("sousi", "0001");
    await resisterMember("fumito", "0002");
    await resisterMember("reishi", "0003");
    await resisterMember("ryo", "0004");
    await resisterMember("takeyama", "0005");
    await resisterMember("takahiro", "0006");
    await resisterMember("moti", "0007");
  })
  .catch((error) => console.log(error));
