/*
  HW questions
  - Why does the GET live in a useEffect with [] and not in the component body?
    The body runs on every render. A GET there would call setTodos, which
    re-renders, which runs the GET again, forever. useEffect with [] runs it
    once, after the first render, and never again.
  - In deleteTodoById, what if setTodos(...) moves ABOVE the await?
    The row would vanish straight away even when the server is down. The
    request then fails, but the screen already says it is gone -- until you
    refresh and it comes back. The screen would be lying.
  - Did the filter need a request? No. Every todo is already in state, so the
    filter is just .filter() on data we are holding, worked out at render time.
    The filter's own state lives in App, because App is where the list is
    chosen before it is handed to TodoList.
  - PUT or PATCH for the done toggle? PATCH. It merges the one field we send
    ({done}) into the record. PUT replaces the whole record, so sending only
    {done} would wipe out the title.
*/
import {useState, useEffect} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import {
  fetchTodos,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
  toggleTodo as toggleTodoRequest,
} from './api'

const FILTERS = ['all', 'active', 'done']

const App = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  // [] = run once, when the component first appears. NOT every render --
  // that would fetch, set state, re-render, fetch again, forever.
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await fetchTodos()
        setTodos(todos)
      } catch (err) {
        // the usual cause: you forgot to start the server in the second tab
        console.error(err)
        setError('Could not reach the server. Is `npm run server` running?')
      } finally {
        setIsLoading(false)
      }
    }
    loadTodos()
  }, [])

  const createTodo = async (title) => {
    // the server makes the id now, so we no longer invent one
    const newTodo = await createTodoRequest(title)
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
  }

  const deleteTodoById = async (id) => {
    // ask the server first. If it refuses, we never touch our state, and the
    // screen keeps telling the truth.
    await deleteTodoRequest(id)

    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(updatedTodos)
  }

  const editTodoById = async (id, newTitle) => {
    // find the whole todo and send all of it, because PUT replaces
    const todo = todos.find((todo) => todo.id === id)
    const updated = await updateTodoRequest({...todo, title: newTitle})

    // map returns a new array the SAME length. Every todo comes back; the one
    // we edited comes back as the object the SERVER sent us.
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updated
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const toggleTodoById = async (id, done) => {
    // same shape as every other one: ask the server, then map the answer in
    const updated = await toggleTodoRequest(id, done)

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updated
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  // derived from state, not stored -- always right, for free
  const remaining = todos.filter((todo) => !todo.done).length

  // also derived, not stored: no request, just filter what we already have
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'done') return todo.done
    return true
  })

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate onCreate={createTodo} />

      <div className="flex gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded capitalize ${
              filter === f ? 'bg-blue-900 text-white' : 'bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-gray-500">Loading your todos...</p>}

      {error && <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>}

      {!isLoading && !error && todos.length === 0 ? (
        <p className="text-gray-500">Nothing yet. Add something above.</p>
      ) : (
        <TodoList
          todos={visibleTodos}
          onDelete={deleteTodoById}
          onEdit={editTodoById}
          onToggle={toggleTodoById}
        />
      )}

      <p className="mt-6 text-sm text-gray-500">
        {remaining} {remaining === 1 ? 'thing' : 'things'} left to do
      </p>
    </div>
  )
}

export default App
