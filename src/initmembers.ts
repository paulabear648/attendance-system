import { MembersDataSource } from "./data-source";
import { Members } from "./entity/Members";

MembersDataSource.initialize()
  .then(async () => {
    const member = new Members();
    member.name = "fumito";
    member.pin = "0129";
    await MembersDataSource.getRepository(Members).save(member);
  })
  .catch((error) => console.log(error));
