import { DataSource } from "typeorm";
import { Pokemon } from "../entities/Pokemon";
import { initializeApplicationCore } from "../initializeApplicationCore";

export const initializeTestApplication = async (dataSource: DataSource) => {
  const app = await initializeApplicationCore(dataSource);

  const repository = dataSource.getRepository(Pokemon);
  await repository.clear(); 

  return app;
}