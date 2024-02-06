import { DataSource } from "typeorm";
import { PokemonService } from "../services/pokemonService";
import { PokemonController } from "../controllers/pokemonController";
import express from "express";
import { Pokemon } from "../entities/Pokemon";

export const initializeTestApplication = async (dataSource: DataSource) => {
  await dataSource
    .initialize()
    .then(() => {
      console.log("Test ORM has been initialized!")
    })
    .catch((err) => {
      console.error("Error during test ORM initialization:", err)
    })

  const repository = dataSource.getRepository(Pokemon);
  await repository.clear(); 

  const pokemonService = new PokemonService(dataSource);
  const pokemonController = new PokemonController(pokemonService);

  const app = express();
  app.get('/random-pokemons', async (req, res) => {
    await pokemonController.getRandomPokemons(req, res);
  });
  return app;
}