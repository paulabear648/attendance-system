import { AppDataSource, MembersDataSource } from "./data-source";

// typeormの起動
const ormInit = {
  init() {
    AppDataSource.initialize()
      .then()
      .catch((error) => console.log(error));

    MembersDataSource.initialize()
      .then()
      .catch((error) => console.log(error));
  },
};

export default ormInit;
