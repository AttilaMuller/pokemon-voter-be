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
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTopTenPokemons(req: Request, res: Response) {
    try {
      const pokemons = await this.pokemonService.getTopTenPokemons();
      res.json(pokemons);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async voteForPokemon(req: Request, res: Response) {
    try {
      const { pokemonId } = req.body;
      if (typeof pokemonId !== 'number') {
        res.status(403).json({ error: 'Only number should be provided as id' });
        return;
      }
      const pokemon = await this.pokemonService.voteForPokemon(pokemonId);
      res.json(pokemon);
    } catch (error: any) {
      if (error.message === 'Pokemon not found'){
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async resetVotes(req: Request, res: Response) {
    try {
      await this.pokemonService.resetVotes();
      res.status(200).send('Votes reset successfully');
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
