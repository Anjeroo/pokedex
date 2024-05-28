import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { Pokemon } from "src/api/pokemons/pokemon.model";
import reducer from "./pokemon.reducer";
import actions from "./pokemon.actions";
import pokemonActions from "./pokemon.actions";

export interface IPokemonContextState {
  pokemons: Map<string, Pokemon>;
  filteredPokemons: Pokemon[];
  selectedPokemons: string[];
  filter: string | null;
  isLoading: boolean;
  error: unknown;
  pagination: {
    offset: number;
    limit: number;
  };
}

interface IPokemonContext {
  state: IPokemonContextState;
  // typeof actions, but each function bound to the current state and dispatch (perhaps remove second argument)
  actions: {
    [key: string]: (
      arg: Parameters<(typeof actions)[keyof typeof actions]>[0]
    ) => void;
  };
}

const PokemonContext = createContext<IPokemonContext>({} as IPokemonContext);
const initialState: IPokemonContextState = {
  filteredPokemons: [],
  pokemons: new Map(),
  selectedPokemons: [],
  filter: null,
  isLoading: false,
  error: null,
  pagination: {
    offset: 0,
    limit: 30,
  },
};

function PokemonProvider(props: React.PropsWithChildren<object>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const transformedActions: IPokemonContext["actions"] = useMemo(() => {
    return Object.entries(actions).reduce((acc, [key, action]) => {
      // @ts-expect-error - não é possível inferir o tipo de value
      acc[key] = (argument) => action(argument, { state, dispatch });

      return acc;
    }, {});
  }, [state, dispatch]);

  useEffect(() => {
    // Quando paginar a página de listagem, deve se carregar os pokemons
    if (state.isLoading) return;

    transformedActions.fetchPokemons(state.pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pagination]);

  return (
    <PokemonContext.Provider
      value={{ state, actions: transformedActions }}
      {...props}
    />
  );
}

function usePokemon() {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { usePokemon, PokemonProvider };
