import axios, { AxiosResponse } from 'axios';
import { ormDataSource } from '../config/typeorm';
import { Pokemon } from '../entities/Pokemon';
import { PokemonApiResponse } from '../model/types';

export class PokemonService {
  constructor() {}

  async fetchPokemonsFromExternalAPI(startId: number, endId: number): Promise<void> {
      try {
        const promises = [];
  
        for (let id = startId; id <= endId; id++) {
          const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
          promises.push(axios.get(url));
        }
  
        const responses: AxiosResponse<PokemonApiResponse>[] = await Promise.all(promises);
  
        for(const response of responses) {
          const pokemon = ormDataSource.getRepository(Pokemon).create({
            name: response.data.name,
            imageUrl: response.data.sprites.front_default,
            abilities: response.data.abilities.map(x => x.ability.name),
            types: response.data.types.map(x => x.type.name),
          });
          await ormDataSource.getRepository(Pokemon).save(pokemon);
        }
      } catch (error: any) {
        console.error('Error during fetching pokemon data', error.message);
        throw new Error('Pokemon data fetching failed');
      }
    }
}