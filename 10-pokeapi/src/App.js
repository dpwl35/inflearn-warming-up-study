import './App.css';
import Nav from './components/Nav';
import PokemonList from './components/PokemonList';
import SearchInput from './components/SearchInput';

function App() {
  return (
    <div className='App'>
      <Nav />
      <SearchInput />
      <PokemonList />
    </div>
  );
}

export default App;
