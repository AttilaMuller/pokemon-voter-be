import { DataSource } from 'typeorm';
import { Pokemon } from '../entities/Pokemon';

export class PokemonService {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getRandomPokemons(): Promise<Pokemon[]> {
    const pokemons = await this.dataSource.getRepository(Pokemon).createQueryBuilder()
    .orderBy("RANDOM()")
    .limit(2)
    .getMany();

    return pokemons;
  }

  async getTopTenPokemons(): Promise<Pokemon[]> {
    const pokemonRepository =  this.dataSource.getRepository(Pokemon);
    const pokemons = await pokemonRepository.find({
      order: { votes: 'DESC' },
      take: 10
    });

    return pokemons;
  }

  async voteForPokemon(id: number): Promise<Pokemon> {
    const pokemonRepository =  this.dataSource.getRepository(Pokemon);
    const pokemon = await pokemonRepository.findOneBy({ id });

    if (pokemon) {
      pokemon.votes += 1;
      return await pokemonRepository.save(pokemon);
    } else {
      throw Error('Pokemon not found');
    }
  }
}