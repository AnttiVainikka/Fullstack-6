
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const updatedAnecdote = await anecdoteService.giveVote(id)
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? updatedAnecdote : anecdote)
      }))
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({anecdotes: state.anecdotes.concat(newAnecdote)}))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)}))
    },
    setFilter: value => set(() => ({ filter: value})),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  }
}))

const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    setNotification: content => set(() => ({ notification: content }))
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
