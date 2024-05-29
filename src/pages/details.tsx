import { usePokemon } from "@contexts/pokemon/pokemon.provider";
import { useParams } from "react-router-dom";
import './details.css'

function DetailsPage() {
  const primaryPokemon = useParams<{ name: string }>().name!;
  const { state: { pokemons } } = usePokemon()
  const pokemon = pokemons.get(primaryPokemon)
  if (!pokemon) {
    return(
      <p style={{"textAlign": "center", "width": "100%"}}>Pokemon não existe</p>
    )
  }
  
  return (
    <main>
      <div id="details">Details</div>
      <div className="pokemonDetails">
        <div className="pokemonBasic">
          <h1 className="pokemonTitle">{primaryPokemon}</h1>
          <p>#{(Array(4).join("0") + pokemon?.id).slice(-4)}</p>
          <img src={pokemon?.img} />
          
        </div>
        <div className="baseStats">
          <h2 className="baseTitle">Base Stats</h2>
          <ul className="ulStats">
            <li>HP: {pokemon?.hp}</li>
            <li>Attack: {pokemon?.attack}</li>
            <li>Defense: {pokemon?.defense}</li>
            <li>Speed: {pokemon?.speed}</li>
          </ul>
          <div className='typeOrganization'>
              {pokemon?.types.map((type) => (
                <div key={`${pokemon.name}-${type}`} className={`${type}`}>
                  {type}
                </div>
              ))}
            </div>
        </div>
      </div>
    </main>
  );
}

export default DetailsPage;
