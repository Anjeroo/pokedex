import { IPokemonContextState } from "./pokemon.provider";
import { PokemonActions } from "./pokemon.actions";

const PokemonReducer = (
  state: IPokemonContextState,
  action: PokemonActions
) => {
  const filterByName =
    (search: string | null) =>
    ({ name }: IPokemonContextState["filteredPokemons"][number]) => {
      return search ? name.includes(search) : true;
    };

  switch (action.type) {
    case "SET_POKEMONS":
      if (!action.payload) return state;

      return {
        ...state,
        pokemons: new Map([...state.pokemons, ...action.payload]),
        filteredPokemons: Array.from(
          new Map([...state.pokemons, ...action.payload]).values()
        ).filter(filterByName(state.filter)),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: !!action.payload,
      };
    case "SET_FILTER":
      if (!action.payload) return state;

      return {
        ...state,
        filter: action.payload,
        filteredPokemons: Array.from(state.pokemons.values()).filter(
          filterByName(action.payload)
        ),
      };
    case "SELECT_POKEMON":
      if (!action.payload) return state;

      return {
        ...state,
        selectedPokemons: [...state.selectedPokemons, action.payload]
      };
    case "PAGINATE":
      if (!action.payload) return state;

      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      };
    default:
      throw new Error("Uh oh! This action type was not accounted for!");
  }
};

export default PokemonReducer;
