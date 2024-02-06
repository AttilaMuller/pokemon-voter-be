export type PokemonApiResponse = {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
}