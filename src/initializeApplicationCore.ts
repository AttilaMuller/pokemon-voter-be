import express from "express";
import { DataSource } from "typeorm";
import { PokemonService } from "./services/pokemonService";
import { PokemonController } from "./controllers/pokemonController";

export const initializeApplicationCore = async (ormDataSource: DataSource): Promise<express.Express> => {
  await ormDataSource
    .initialize()
    .then(() => {
      console.log("ORM has been initialized!")
    })
    .catch((err) => {
      console.error("Error during ORM initialization:", err)
    });

  const app = express();
  app.use(express.json());

  const pokemonService = new PokemonService(ormDataSource);
  const pokemonController = new PokemonController(pokemonService);

  app.get('/random-pokemons', pokemonController.getRandomPokemons.bind(pokemonController));
  app.get('/top-ten-pokemons', pokemonController.getTopTenPokemons.bind(pokemonController));
  app.post('/vote', pokemonController.voteForPokemon.bind(pokemonController));
  app.post('/reset-votes', pokemonController.resetVotes.bind(pokemonController));

  return app;
}