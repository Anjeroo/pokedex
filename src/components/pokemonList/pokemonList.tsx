import { useMemo } from "react";
import './pokemonList.css'
import { DETAILS_PAGE } from "@constants/routing.constants";
import { usePokemon } from "@contexts/pokemon/pokemon.provider";

interface PokemonListProps {search: string,}

const PokemonList: React.FC<PokemonListProps> = () => {
  const {
    state: { isLoading, filteredPokemons, pagination, pokemons },
    actions: { loadPokemons },
  } = usePokemon();

  const isInitial = useMemo(() => pokemons.size === 0, [pokemons.size]);

  const onIntersect = () => {
    if (isLoading) return;

    loadPokemons({
      limit: pagination.limit,
      offset: isInitial ? 0 : pagination.offset + pagination.limit,
    });
  };

  return (
    <div>
      <h1 id="pokemonListTitle">List Pokemon</h1>
      <ul className='pokemonList'>
        {filteredPokemons.map((pokemon) => (
          <a className="pokemonLink" href={DETAILS_PAGE.path.replace(":name", pokemon.name)}>
          <li key={pokemon.name} className='pokemonCard'>
            <h1 className='pokemonName'>{pokemon.name}</h1>
            <p className='pokemonId'>
              #{(Array(4).join("0") + pokemon.id).slice(-4)}
            </p>
            <img src={pokemon.img} />
            <div className='typeOrganization'>
              {pokemon.types.map((type) => (
                <div key={`${pokemon.name}-${type}`} className={`${type}`}>
                  {type}
                </div>
              ))}
            </div>
          </li>
        </a>
        ))}
      </ul>
      <button className="button" onClick={() => loadPokemons({
          limit: pagination.limit,
          offset: isInitial ? 0 : pagination.offset + pagination.limit,
        })}>Carregar mais pokemons</button>
    </div>
  );
};

export default PokemonList;
