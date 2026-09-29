const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const giveVote = async (id) => {
  //checking if the anecdote still exists
  const currentResponse = await fetch(`${baseUrl}/${id}`)
  if (!currentResponse.ok) {
    throw new Error('Failed to fetch anecdote')
  }

  const currentAnecdote = await currentResponse.json()
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ votes: currentAnecdote.votes + 1 }),
  })

  if (!response.ok) {
    throw new Error('Failed to update anecdote votes')
  }

  return await response.json()
}

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete anecdote')
  }
}

export default { getAll, createNew, giveVote, remove }