import express from 'express';
import { ormDataSource } from './config/typeorm'
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

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Fetching initial database records...')
    const pokemonService = new PokemonService();
    await pokemonService.fetchPokemonsFromExternalAPI(1,100);
    console.log('Fetching initial database records complete')
  });
}

initializeApp();
