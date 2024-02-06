import axios, { AxiosResponse } from 'axios';
import { FetchPokemonService } from './fetchPokemonService';
import { ormDataSource } from '../../config/typeorm';
import { Pokemon } from '../../entities/Pokemon';
import { PokemonApiResponse } from '../../model/types';

jest.mock('../../config/typeorm');

describe('PokemonService', () => {
  let pokemonRepositoryMock: any;

  beforeEach(() => {
    pokemonRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('#fetchPokemonsFromExternalAPI', () => {
    const mockResponse: Partial<AxiosResponse<PokemonApiResponse>> = {
      data: {
        name: 'bulbasaur',
        sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
        abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }],
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      },
    };

    it('should fetch and save pokemons', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);
      jest.spyOn(ormDataSource, 'getRepository').mockReturnValue(pokemonRepositoryMock);

      const pokemonService = new FetchPokemonService();
      await pokemonService.fetchPokemonsFromExternalAPI(1, 1);

      expect(ormDataSource.getRepository(Pokemon).create).toHaveBeenCalledWith({
        name: 'bulbasaur',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        abilities: ['overgrow', 'chlorophyll'],
        types: ['grass', 'poison'],
      });
    });

    it('should fetch and save multiple pokemons', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);
      jest.spyOn(ormDataSource, 'getRepository').mockReturnValue(pokemonRepositoryMock);

      const pokemonService = new FetchPokemonService();
      await pokemonService.fetchPokemonsFromExternalAPI(1, 2);

      expect(ormDataSource.getRepository(Pokemon).save).toHaveBeenCalledTimes(2);
    });

    it('should handle error during fetching pokemons', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('Boom!'));

      const pokemonService = new FetchPokemonService();

      try {
        await pokemonService.fetchPokemonsFromExternalAPI(1, 1);
      } catch (error: any) {
        expect(error.message).toEqual('Pokemon data fetching failed');
      }
    });
  });
});
