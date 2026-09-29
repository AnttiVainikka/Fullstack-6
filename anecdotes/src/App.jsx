import { useEffect } from "react"
import AnecdoteForm from "./components/AnecdoteForm.jsx"
import AnecdoteList from "./components/AnecdoteList.jsx"
import Filter from "./components/Filter.jsx"
import Notification from "./components/Notification.jsx"
import { useAnecdoteActions } from "./store.js"

const App = () => {
  const { initialize } = useAnecdoteActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App