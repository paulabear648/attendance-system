import { AppDataSource } from "./data-source";
import { List } from "./entity/List";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const list = new List();
    list.name = "岩田";
    list.state = "入室";
    await AppDataSource.manager.save(list);
    console.log("Saved a new user with id: " + list.id);

    console.log("Loading users from the database...");
    const lists = await AppDataSource.manager.find(List);
    console.log("Loaded users: ", lists);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));
