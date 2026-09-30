import { useAnecdotes, useAnecdoteActions, useNotificationActions } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote, remove } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()
    
    const giveVote = async (anecdote) => {
        await vote(anecdote.id)
        setNotification(`you voted '${anecdote.content}'`)
        setTimeout(() => {
            setNotification("")
        }, 5000)
    }

    const removeAnecdote = async (anecdote) => {
        await remove(anecdote.id)
        setNotification(`you deleted '${anecdote.content}'`)
        setTimeout(() => {
            setNotification("")
        }, 5000)
    }

    return (
        <div>
            {anecdotes
                .map((anecdote) => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => giveVote(anecdote)}>vote</button>
                    {anecdote.votes === 0 && 
                        <button onClick={() => removeAnecdote(anecdote)}>delete</button>}
                </div>
                </div>
                ))
            }
      </div>
    )
}

export default AnecdoteList