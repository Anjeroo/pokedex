import { Header } from './components/header/header'
import PokemonList from './components/pokemonList/pokemonList'
import './App.css'

function App() {

  return (
    <>
      {<div id='container'>
        <Header/>
        <div id='pokemonList'>
        <PokemonList/>
        </div>
      </div>}
      
    </>
  )
}

export default App
