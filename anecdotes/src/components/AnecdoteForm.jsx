import { useAnecdoteActions, useNotificationActions } from "../store"

const AnecdoteForm = () => {

    const { add } = useAnecdoteActions()
    const { setNotification} = useNotificationActions()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        const content = new FormData(form).get("anecdote")?.toString() ?? ""
        await add(content)
        setNotification(`you created '${content}'`)
        setTimeout(() => {
            setNotification("")
        }, 5000)
        form.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                <input data-testid="anecdote" name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
