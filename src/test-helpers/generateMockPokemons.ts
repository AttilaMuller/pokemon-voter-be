import { DataSource } from "typeorm";
import { Pokemon } from "../entities/Pokemon";

export const generateMockPokemons = async (dataSource: DataSource) => {
    const mockPokemon = {
      name: 'test_name',
      imageUrl: 'https://test.com/image.png',
      abilities: ['test_ability_1', 'test_ability_2'],
      types: ['test_type_1', 'test_type_2']
    };
    const mockPokemons = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((num: number) => ({
      ...mockPokemon,
      name: `${mockPokemon.name}_${num}`,
      votes: num
      }));
    for(let mockPokemon of mockPokemons) {
      const pokemon = dataSource.getRepository(Pokemon).create(mockPokemon);
      await dataSource.getRepository(Pokemon).save(pokemon);
    }
  }