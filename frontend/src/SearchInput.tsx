import './SearchInput.css'

interface SearchInputProps {
  setAttempts: React.Dispatch<React.SetStateAction<number>>
}

export default function SearchInput({ setAttempts }: SearchInputProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempts((prev) => prev + 1)
  }
  return (
    <form
      className="santa-search-form"
      onSubmit={(event) => handleSubmit(event)}
    >
      <input
        className="santa-search"
        type="text"
        placeholder="what would you like for christmas in july?"
      />
    </form>
  )
}
