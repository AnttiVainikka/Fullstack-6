import { useAnecdoteActions } from "../store"

const AnecdoteForm = () => {

    const actions = useAnecdoteActions()

    const add = (event) => {
        event.preventDefault()
        const content = new FormData(event.currentTarget).get("new")?.toString() ?? ""
        actions.add(content)
        event.currentTarget.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div>
                <input data-testid="new" name="new" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
