import { useLayoutEffect, useState } from "react";
import './pokemonList.css'

interface Pokemon {
  name: string;
  types: string[];
  img: string;
  number: number;
}

function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useLayoutEffect(() => {
    async function fetchPokemons() {
      await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
        .then((response) => response.json())
        .then(async (data) => {
          return await Promise.all(
            data.results.map(async (pokemon) =>
              await fetch(pokemon.url)
                .then((response) => response.json())
                .then((data) => ({
                  name: data.name,
                  types: data.types.map(type => type.type.name),
                  img: data.sprites.other["official-artwork"].front_default,
                  number: data.id,
                }))
            )
          ).then((pokemons) => setPokemons(pokemons));
        })
        .catch((e) => {
          console.error(e);
        });
    }

    fetchPokemons();
  }, []);

  console.log(pokemons);


  return (
    <ul className="pokemonList">
      {pokemons.map((pokemon) => (
        <li key={pokemon.name} className="pokemonCard">
         <h1 className="pokemonName">{pokemon.name}</h1> 
         <p className="pokemonId">#{(Array(4).join("0")+pokemon.number).slice(-4)}</p>
          <img src={pokemon.img} />
          <div className="typeOrganization">
            {pokemon.types.map((type) => (
              <div key={`${pokemon.name}-${type}`} className={`${type}`} >
                {type}
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
export default PokemonList;