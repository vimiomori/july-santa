import { useRef } from 'react'
import './SearchInput.css'

interface SearchInputProps {
  setAttempts: React.Dispatch<React.SetStateAction<number>>
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  startAudio: () => void
  submitHandler: (name: string) => void
}

export default function SearchInput({ submitHandler }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // setAttempts((prev) => prev + 1)
    // setSubmitted(true)
    // startAudio()
    console.log(event)
    console.log(event.target)

    if (inputRef.current!.value) {
      submitHandler(inputRef.current!.value)
    }
  }
  return (
    <form
      className="santa-search-form"
      onSubmit={(event) => handleSubmit(event)}
    >
      <input
        className="santa-search shadow"
        type="text"
        placeholder="what would you like for christmas in july?"
        ref={inputRef}
      />
    </form>
  )
}
