import { ormDataSource } from './config/typeorm'
import { FetchPokemonService } from './services/fetchPokemonService/fetchPokemonService';
import { initializeApplicationCore } from './initializeApplicationCore';

const initialize = async () => {
  const app = await initializeApplicationCore(ormDataSource);
  const port = process.env.PORT || 3000;

  app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Fetching initial database records...')
    const pokemonService = new FetchPokemonService();
    await pokemonService.fetchPokemonsFromExternalAPI(1,100);
    console.log('Fetching initial database records complete')
  });
}

initialize();
