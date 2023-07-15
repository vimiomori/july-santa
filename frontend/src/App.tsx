import { useState } from 'react'
import santabeach from './assets/santa-beach.jpeg'
import './App.css'
import SearchInput from './SearchInput'

function App() {
  const [attempts, setAttempts] = useState(0)
  const threeAttempts = attempts >= 3
  return (
    <div id="App">
      <div
        className="search-box"
        style={{ backgroundImage: 'url(' + santabeach + ')' }}
      >
        <header>
          <h1>tell me what you'd like for christmas in july</h1>
          <p>(you can have anything you want)</p>
        </header>
        <section className="middle"></section>
        <section className="good-stuff">
          <SearchInput setAttempts={setAttempts} />
          <div className="message-area">
            {threeAttempts && (
              <p>this would go faster if you told me your name</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
