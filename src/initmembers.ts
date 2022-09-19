import { AppDataSource } from "./data-source";
import { Members } from "./entity/Members";

AppDataSource.initialize()
  .then(async () => {
    // memberの初期化をここでする

    const member = new Members();
    member.name = "fumito";
    member.pin = "0129";
    await AppDataSource.getRepository(Members).save(member);
  })
  .catch((error) => console.log(error));
