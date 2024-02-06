import request from 'supertest';
import express from 'express';
import { DataSource } from 'typeorm';
import { ormTestDataSource } from '../config/typeorm';
import { Pokemon } from "../entities/Pokemon"
import { initializeTestApplication } from '../test-helpers/initializeTestApplication';

describe('PokemonController', () => {
  const dataSource: DataSource = ormTestDataSource;
  let app: express.Express;

  beforeAll(async () => {
    app = await initializeTestApplication(dataSource);
    const mockPokemon1 = dataSource.getRepository(Pokemon).create({
      name: 'bulbasaur',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      abilities: ['overgrow', 'chlorophyll'],
      types: ['grass', 'poison']
    });
    const mockPokemon2 = dataSource.getRepository(Pokemon).create({
      name: 'charmander',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      abilities: ['blaze', 'solar-power'],
      types: ['fire']
    });
    const mockPokemon3 = dataSource.getRepository(Pokemon).create({
      name: 'squirtle',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
      abilities: ['torrent', 'rain-dish'],
      types: ['water']
    });
    await dataSource.getRepository(Pokemon).save(mockPokemon1);
    await dataSource.getRepository(Pokemon).save(mockPokemon2);
    await dataSource.getRepository(Pokemon).save(mockPokemon3);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should retrieve random pokemons', async () => {
    const response = await request(app).get('/random-pokemons');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].id).not.toBe(response.body[1].id);
  });
});


