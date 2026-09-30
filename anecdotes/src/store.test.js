import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        giveVote: vi.fn(),
    }
}))


import useAnecdoteStore, {useAnecdotes, useAnecdoteActions} from './store'
import anecdoteService from './services/anecdotes'

const mockAnecdotes = [{ id: 1, content: "Hi, I'm fake", votes: 6},
    {id: 2, content: "I, also, am fake", votes:7}, {id: 3, content: "Just for testing", votes:67},
    {id: 4, content: "I'm also here", votes:44}]

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
    vi.clearAllMocks()
})

describe('useAnecdoteActions and useAnecdotes work as intended', () => {
    it('state is initialized with anecdotes from (mock) backend', async () => {
        
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toHaveLength(mockAnecdotes.length)
        expect(anecdotesResult.current).toEqual(expect.arrayContaining(mockAnecdotes))
    })
    
    it('useAnecdotes returns the anecdotes sorted by votes', () => {
        useAnecdoteStore.setState({ anecdotes: mockAnecdotes})
        const { result } = renderHook(() => useAnecdotes())
        const votes = result.current.map((anecdote) => anecdote.votes)
        expect(votes.every((val, i) => i === 0 || votes[i - 1] >= val)).toBe(true)
    })
    
    it('useAnecdotes returns only the anecdotes that pass the filter', () => {
        useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: "also"})
        const { result } = renderHook(() => useAnecdotes())
        expect(result.current).toEqual([{id: 4, content: "I'm also here", votes:44},
            {id: 2, content: "I, also, am fake", votes:7}])
    })

    it('vote action increases anecdotes vote total by 1', async () => {
        useAnecdoteStore.setState({ anecdotes: mockAnecdotes})
        anecdoteService.giveVote.mockResolvedValue({
            ...mockAnecdotes[2],
            votes: 68,
        })
        const { result } = renderHook(() => useAnecdoteActions())
        await act(async () => {
            await result.current.vote(3)
        })
        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current[0].votes).toEqual(68)
    })
})

