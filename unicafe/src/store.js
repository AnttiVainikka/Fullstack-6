import { create } from 'zustand'

const useFeedbackStore = create((set) => {
    const increment = (index) => set(state => {
        const statistics = [...state.statistics]
        statistics[index] += 1
        return { statistics }
    })

    return {
        statistics: [0,0,0],
        actions: {
            good: () => increment(0),
            neutral: () => increment(1),
            bad: () => increment(2)
        }
    }
})

export const useStatistics = () => useFeedbackStore((state) => state.statistics)
export const useFeedbackActions = () => useFeedbackStore((state) => state.actions)
