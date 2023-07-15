import santabeach from './assets/santa-beach.jpeg'
import './App.css'
import SearchInput from './SearchInput'

function App() {
  return (
    <div id="App">
      <div
        className="search-box"
        style={{ backgroundImage: 'url(' + santabeach + ')' }}
      >
        <h1>santa in july</h1>
        <SearchInput />
      </div>
    </div>
  )
}

export default App
