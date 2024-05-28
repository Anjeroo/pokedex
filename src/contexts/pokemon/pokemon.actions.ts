import { Pokemon } from "@api/pokemons/pokemon.model";
import { getPokemons, getPokemon } from "@api/pokemons/pokemon.api";
import { IPokemonContextState } from "./pokemon.provider";
import { isFulfilled } from "@api/type";

export type PokemonActions =
  | SetFilterAction
  | SetLoadingAction
  | SetPokemonsAction
  | PaginateAction
  | SelectPokemonAction;

type SetPokemonsAction = {
  type: "SET_POKEMONS";
  payload: Map<string, Pokemon>;
};
type SetLoadingAction = { type: "SET_LOADING"; payload: boolean };
type SetFilterAction = { type: "SET_FILTER"; payload: string };
type PaginateAction = {
  type: "PAGINATE";
  payload: IPokemonContextState["pagination"];
};
type SelectPokemonAction = { type: "SELECT_POKEMON"; payload: Pokemon["name"] };

const setPokemons = (
  pokemons: Map<string, Pokemon>,
  {
    dispatch,
  }: {
    state: IPokemonContextState;
    dispatch: React.Dispatch<SetPokemonsAction>;
  }
) => {
  dispatch({
    type: "SET_POKEMONS",
    payload: pokemons,
  });
};

const setFilter = (
  name: string,
  { dispatch }: { dispatch: React.Dispatch<SetFilterAction> }
) => {
  dispatch({
    type: "SET_FILTER",
    payload: name,
  });
};

const setLoading = (
  loading: boolean,
  { dispatch }: { dispatch: React.Dispatch<SetLoadingAction> }
) => {
  dispatch({ type: "SET_LOADING", payload: loading });
};

const selectPokemon = (
  name: Pokemon["name"],
  { dispatch }: { dispatch: React.Dispatch<SelectPokemonAction> }
) => {
  dispatch({ type: "SELECT_POKEMON", payload: name });
};

const fetchPokemons = async (
  pagination: { offset: string; limit: string },
  {
    dispatch,
  }: { dispatch: React.Dispatch<SetLoadingAction | SetPokemonsAction> }
) => {
  const params = new URLSearchParams(pagination);

  dispatch({ type: "SET_LOADING", payload: true });

  // Captura a lista de pokemons
  await getPokemons(params)
    .then(
      async ({ results: pokemons }) =>
        // Captura os detalhes de cada pokemon
        await Promise.allSettled(pokemons.map(({ name }) => getPokemon(name)))
          .then((responses) =>
            // Filtra os resultados que foram resolvidos e cria um vetor de pokemons
            responses.filter(isFulfilled).map(({ value: pokemon }) => pokemon)
          )
          .then(
            (pokemons) =>
              // Cria um mapa de pokemons, sendo o nome do pokemon a chave
              new Map(
                pokemons.map((pokemon) => [
                  pokemon.name,
                  {
                    id: pokemon.id,
                    name: pokemon.name,
                    types: pokemon.types.map(({ type }) => type.name),
                    img: pokemon.sprites.other["official-artwork"]
                      .front_default,
                    attack: pokemon.stats.find(({stat}) => stat.name==="attack")?.base_stat,
                    defense: pokemon.stats.find(({stat}) => stat.name==="defense")?.base_stat,
                    hp: pokemon.stats.find(({stat}) => stat.name==="hp")?.base_stat,
                    speed: pokemon.stats.find(({stat}) => stat.name==="speed")?.base_stat,
                  } as Pokemon,
                ])
              )
          )
    )
    .then((pokemons) => {
      dispatch({ type: "SET_POKEMONS", payload: pokemons });
    });

  dispatch({ type: "SET_LOADING", payload: false });
};

const loadPokemons = (
  pagination: IPokemonContextState["pagination"],
  { dispatch }: { dispatch: React.Dispatch<PaginateAction> }
) => {
  dispatch({ type: "PAGINATE", payload: pagination });
};

export default {
  fetchPokemons,
  setPokemons,
  setFilter,
  setLoading,
  selectPokemon,
  loadPokemons,
};
