import { Member } from "../entity/member";
import { MemberDataSource } from "../sources/data-source";

// データの登録を行う関数
async function registerMember(name: string, pin: string): Promise<void> {
  const member = new Member();
  member.name = name;
  member.pin = pin;
  await MemberDataSource.getRepository(Member).save(member);
}

MemberDataSource.initialize()
  .then(async () => {
    // データの登録
    await registerMember("akito", "0000");
    await registerMember("sousi", "0001");
    await registerMember("fumito", "0002");
    await registerMember("reishi", "0003");
    await registerMember("ryo", "0004");
    await registerMember("takeyama", "0005");
    await registerMember("takahiro", "0006");
    await registerMember("moti", "0007");
  })
  .catch((error) => console.log(error));
