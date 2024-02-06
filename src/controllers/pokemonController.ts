import { Request, Response } from 'express';
import { PokemonService } from '../services/pokemonService';

export class PokemonController {
  private pokemonService: PokemonService;

  constructor(pokemonService: PokemonService) {
    this.pokemonService = pokemonService;
  }

  async getRandomPokemons(req: Request, res: Response) {
    try {
      const pokemons = await this.pokemonService.getRandomPokemons();
      res.json(pokemons);
    } catch (error: any) {
      console.error('Error retrieving random pokemons:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTopTenPokemons(req: Request, res: Response) {
    try {
      const pokemons = await this.pokemonService.getTopTenPokemons();
      res.json(pokemons);
    } catch (error: any) {
      console.error('Error retrieving top ten pokemons:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
