import request from 'supertest';
import express from 'express';
import { DataSource, MoreThan } from 'typeorm';
import { ormTestDataSource } from '../config/typeorm';
import { initializeTestApplication } from '../test-helpers/initializeTestApplication';
import { Pokemon } from '../entities/Pokemon';
import { generateMockPokemons } from '../test-helpers/generateMockPokemons';

describe('PokemonController', () => {
  const dataSource: DataSource = ormTestDataSource;
  let app: express.Express;

  beforeAll(async () => {
    app = await initializeTestApplication(dataSource);
    await generateMockPokemons(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('#getRandomPokemons', () => {
    it('should retrieve random pokemons', async () => {
      const response = await request(app).get('/random-pokemons');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].id).not.toBe(response.body[1].id);
    });
  })

  describe('#getTopTenPokemons', () => {
    it('should retrieve top ten pokemons', async () => {
      const response = await request(app).get('/top-ten-pokemons');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(10);
      expect(response.body[0].votes).toEqual(15);
      expect(response.body[response.body.length - 1].votes).toEqual(6);
    });
  })

  describe('#voteForPokemon', () => {
    it('should be able to vote', async () => {
      const pokemonRepository = dataSource.getRepository(Pokemon);
      const pokemon = await pokemonRepository.findOneBy({name: 'test_name_1'});
      const response = await request(app).post('/vote').send({ pokemonId: pokemon!.id });
  
      expect(response.status).toBe(200);
      expect(response.body.votes).toEqual(pokemon!.votes + 1);
    });

    it('should get error when id does not exist', async () => {
      const response = await request(app).post('/vote').send({ pokemonId: 54321 });
  
      expect(response.status).toBe(404);
    });

    it('should get error when id is not number', async () => {
      const response = await request(app).post('/vote').send({ pokemonId: 'hello' });
  
      expect(response.status).toBe(403);
    });
  })

  describe('#resetVotes', () => {
    it('should reset votes for all pokemons', async () => {
      const response = await request(app).post('/reset-votes');
  
      const pokemonsWithVotes = await dataSource.getRepository(Pokemon).find({ where: { votes: MoreThan(0) } });
      expect(response.status).toBe(200);
      expect(pokemonsWithVotes.length).toEqual(0);
    });
  })
});