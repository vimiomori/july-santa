import { useState, useEffect } from 'react'
import santabeach from './assets/santa-beach.jpeg'
// import hoho from './assets/Hoho.m4a'
import SearchInput from './SearchInput'
import { getHelloWorld, getJoke, getPresent } from './api'
import './App.css'
import Present from './Present'

const friends = ['tucker', 'crista', 'jen', 'zach', 'kaz']

function App() {
  const [attempts, setAttempts] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [present, setPresent] = useState('')
  const [fetching, setFetching] = useState(false)
  const [gotPresent, setGotPresent] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [imgUrl, setImageUrl] = useState('')
  const threeAttempts = attempts >= 3

  function handleAudio() {
    const hoHoHoAudio = new Audio('/Hoho.mp3')
    const julyAudio = new Audio('/July.mp3')
    if (attempts % 4 === 0) {
      julyAudio.play().catch((err) => console.log(err))
      return
    }
    hoHoHoAudio.play().catch((err) => console.log(err))
  }

  useEffect(() => {
    console.log('loaded')
  }, [])

  function cleanupName(inputText: string) {
    const nameRegex = /(tucker|crista|jen|zack|kaz|cleo)/
    const matches = inputText.match(nameRegex)
    const match = matches?.[1]
    return match ? match : 'joke'
  }

  function handleSubmit(name: string) {
    console.log(name)
    const cleanedUp = cleanupName(name)
    console.log('cleaned up: ', cleanedUp)
    setAttempts((prev) => prev + 1)
    setSubmitted(true)
    handleAudio()
    setName('')
    setImageUrl('')
    setMessage('')
    setGotPresent(false)
    setFetching(true)
    if (cleanedUp === 'joke') {
      getJoke()
        .then((present) => {
          setGotPresent(true)
          setMessage(present.joke)
          setFetching(false)
        })
        .catch((err) => console.log(err))
    }
    if (cleanedUp !== 'joke') {
      getPresent(cleanedUp)
        .then((present) => {
          setGotPresent(true)
          setMessage(present.response)
          setName(cleanedUp)
          setImageUrl(present.imageURL)
          setFetching(false)
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <div id="App">
      <div
        className="search-box"
        style={{ backgroundImage: 'url(' + santabeach + ')' }}
      >
        <header>
          <h1>tell me what you'd like for christmas in july</h1>
          <p className="sub-heading">(you can have anything you want)</p>
        </header>
        <section className="middle">
          <Present name={name} message={message} imgSrc={imgUrl} />
          {fetching && <p>finding present...</p>}
          {gotPresent && <p>{present}</p>}
        </section>
        <section className="good-stuff">
          <SearchInput
            setAttempts={setAttempts}
            setSubmitted={setSubmitted}
            startAudio={handleAudio}
            submitHandler={handleSubmit}
          />
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
