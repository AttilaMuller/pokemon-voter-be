import request from 'supertest';
import express from 'express';
import { DataSource } from 'typeorm';
import { ormTestDataSource } from '../config/typeorm';
import { initializeTestApplication } from '../test-helpers/initializeTestApplication';
import { Pokemon } from '../entities/Pokemon';

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

  describe('#random-pokemons', () => {
    it('should retrieve random pokemons', async () => {
      const response = await request(app).get('/random-pokemons');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].id).not.toBe(response.body[1].id);
    });
  })

  describe('#top-ten-pokemons', () => {
    it('should retrieve top ten pokemons', async () => {
      const response = await request(app).get('/top-ten-pokemons');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(10);
      expect(response.body[0].votes).toEqual(15);
      expect(response.body[response.body.length - 1].votes).toEqual(6);
    });
  })
});

const generateMockPokemons = async (dataSource: DataSource) => {
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