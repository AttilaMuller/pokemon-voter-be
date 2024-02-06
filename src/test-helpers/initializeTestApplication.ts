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

  const app = express();
  app.use(express.json())

  const pokemonService = new PokemonService(dataSource);
  const pokemonController = new PokemonController(pokemonService);

  app.get('/random-pokemons', pokemonController.getRandomPokemons.bind(pokemonController));
  app.get('/top-ten-pokemons', pokemonController.getTopTenPokemons.bind(pokemonController));
  app.post('/vote', pokemonController.voteForPokemon.bind(pokemonController));
  app.post('/reset-votes', pokemonController.resetVotes.bind(pokemonController));

  return app;
}