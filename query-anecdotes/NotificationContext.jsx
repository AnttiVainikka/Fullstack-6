import { createContext, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState('')

    const reset = () => setNotification('')
    const vote = (content) => setNotification(`anecdote '${content}' voted`)
    const create = (content) => setNotification(`anecdote '${content}' created`)
    const short = () => setNotification('too short anecdote, must have length 5 or more')

    return (
        <NotificationContext.Provider value={{ notification, reset, vote, create, short }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

