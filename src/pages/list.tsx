import { Header } from "@components/header/header";
import PokemonList from "@components/pokemonList/pokemonList";

function ListPage() {
  return (
    <>
      <div id='container'>
        <Header />
        <div id='pokemonList'>
          <PokemonList />
        </div>
      </div>
    </>
  );
}

export default ListPage;
