import { DataSource } from 'typeorm';
import { Pokemon } from '../entities/Pokemon';

export class PokemonService {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getRandomPokemons(): Promise<Pokemon[]> {
    const randomPokemons = await this.dataSource.getRepository(Pokemon).createQueryBuilder()
    .orderBy("RANDOM()")
    .limit(2)
    .getMany();

    return randomPokemons;
  }
}