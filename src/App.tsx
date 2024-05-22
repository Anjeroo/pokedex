import viteLogo from '/vite.svg'
import PokemonList from './components/pokemonList/pokemonList'
import './App.css'

function App() {

  return (
    <>
      {/* <div id='container'>
        <div id='pokemonList'>
          <div className='pokemon' id='pokemon1'>
            <div id= 'imgTitle'>

            </div>
            <div id='pokemonType'>

            </div>
          </div>
        </div>
      </div> */}
      <PokemonList></PokemonList>
    </>
  )
}

export default App
