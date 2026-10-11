import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from "./hooks/useAnecdotes";
import useNotify from "./hooks/useNotify"

const App = () => {
  const { anecdotes, isPending, isError, addAnecdote: addAnecdoteToServer, addVote } = useAnecdotes()
  const { reset, vote, create, short } = useNotify()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    if (content.length < 5) {
      short()
      setTimeout(() => {
            reset()
        }, 5000)
    } else {
      addAnecdoteToServer(content)
      create(content)
      setTimeout(() => {
              reset()
          }, 5000)
    }
  }

  const giveVote = (anecdote) => {
    addVote(anecdote)
    vote(anecdote.content)
    setTimeout(() => {
            reset()
        }, 5000)
  }

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onSubmit={addAnecdote}/>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => giveVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App