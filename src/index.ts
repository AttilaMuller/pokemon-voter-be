import express from 'express';
import { ormDataSource } from './config/typeorm'
import { FetchPokemonService } from './services/fetchPokemonService/fetchPokemonService';
import { PokemonController } from './controllers/pokemonController';
import { PokemonService } from './services/pokemonService';

const initializeApp = async () => {
  await ormDataSource
    .initialize()
    .then(() => {
        console.log("ORM has been initialized!")
    })
    .catch((err) => {
        console.error("Error during ORM initialization:", err)
    })

  const app = express();
  const port = process.env.PORT || 3000;
  app.use(express.json())

  const pokemonService = new PokemonService(ormDataSource);
  const pokemonController = new PokemonController(pokemonService);

  app.get('/random-pokemons', pokemonController.getRandomPokemons.bind(pokemonController));
  app.get('/top-ten-pokemons', pokemonController.getTopTenPokemons.bind(pokemonController));
  app.post('/vote', pokemonController.voteForPokemon.bind(pokemonController));
  app.post('/reset-votes', pokemonController.resetVotes.bind(pokemonController));

  app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Fetching initial database records...')
    const pokemonService = new FetchPokemonService();
    await pokemonService.fetchPokemonsFromExternalAPI(1,100);
    console.log('Fetching initial database records complete')
  });
}

initializeApp();
