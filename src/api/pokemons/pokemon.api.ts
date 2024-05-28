import { BASE_URL } from "@constants/api.constants";
import { NamedAPIResourceList } from "@api/type";

import { PokemonAPIResource } from "./pokemon.model";

const POKEMON_PATH = "/pokemon";

export const getPokemons = async (
  params?: URLSearchParams
): Promise<NamedAPIResourceList> => {
  const response = await fetch(`${BASE_URL}${POKEMON_PATH}?${params}`);
  return response.json();

};

export const getPokemon = async (name: string): Promise<PokemonAPIResource> => {
  const response = await fetch(`${BASE_URL}${POKEMON_PATH}/${name}`);
  console.log(response.body)
  return response.json();

};
