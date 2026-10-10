const AnecdoteForm = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(event)
  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm