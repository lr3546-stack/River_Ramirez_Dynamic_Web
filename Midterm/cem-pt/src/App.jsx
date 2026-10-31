import {useState, useEffect} from 'react'
import PlanHeader from './components/PlanHeader'
import RecommendationCard from './components/RecommendationCard'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import BottomNav from './components/BottomNav'
import {
  fetchTodos,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
  toggleTodo as toggleTodoRequest,
} from './api'

const App = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  // which tab is showing: 'todo' or 'done'
  const [tab, setTab] = useState('todo')
  // the + button in the nav and the form are siblings, so App owns this
  const [showCreate, setShowCreate] = useState(false)

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

  // every change asks the server first. If the server is not there, say so
  // on screen instead of silently doing nothing.
  const showSaveError = (err) => {
    console.error(err)
    setError('Could not save that change. Is `npm run server` running?')
  }

  const createTodo = async (title, video) => {
    try {
      // the server makes the id now, so we no longer invent one
      const newTodo = await createTodoRequest(title, video)
      setTodos([...todos, newTodo])
      setShowCreate(false)
      // a new exercise is not done yet, so show the tab it landed in
      setTab('todo')
      setError(null)
    } catch (err) {
      showSaveError(err)
    }
  }

  const deleteTodoById = async (id) => {
    try {
      // ask the server first. If it refuses, we never touch our state, and
      // the screen keeps telling the truth.
      await deleteTodoRequest(id)
      setTodos(todos.filter((todo) => todo.id !== id))
      setError(null)
    } catch (err) {
      showSaveError(err)
    }
  }

  const editTodoById = async (id, newTitle, newVideo) => {
    try {
      // find the whole todo and send all of it, because PUT replaces --
      // leave the video out of this and the server forgets it
      const todo = todos.find((todo) => todo.id === id)
      const updated = await updateTodoRequest({
        ...todo,
        title: newTitle,
        video: newVideo,
      })
      // the one we edited comes back as the object the SERVER sent us
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)))
      setError(null)
    } catch (err) {
      showSaveError(err)
    }
  }

  const toggleTodoById = async (id, done) => {
    try {
      // same shape as every other one: ask the server, then map the answer in
      const updated = await toggleTodoRequest(id, done)
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)))
      setError(null)
    } catch (err) {
      showSaveError(err)
    }
  }

  // derived from state, not stored -- always right, for free
  const doneCount = todos.filter((todo) => todo.done).length
  const percent = todos.length ? Math.round((doneCount / todos.length) * 100) : 0

  // also derived, not stored: checking one off changes `done`, so on the next
  // render it simply belongs to the other tab -- no request, no moving
  const todoCount = todos.length - doneCount
  const visibleTodos = todos.filter((todo) => {
    return tab === 'done' ? todo.done : !todo.done
  })

  const TABS = [
    {value: 'todo', label: `Assigned (${todoCount})`},
    {value: 'done', label: `Completed (${doneCount})`},
  ]

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-page font-manrope">
      <PlanHeader percent={percent} />

      {/* pb-32 leaves room for the fixed bottom nav */}
      <main className="flex flex-col gap-6 px-6 pt-6 pb-32">
        <RecommendationCard />

        {showCreate && <TodoCreate onCreate={createTodo} />}

        <div className="flex items-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`rounded-full px-4 py-1 text-sm font-semibold ${
                tab === t.value ? 'bg-brand text-white' : 'bg-white text-slate-500'
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="ml-auto text-sm font-bold text-brand"
          >
            {showCreate ? 'Cancel' : '+ Assign exercise'}
          </button>
        </div>

        {isLoading && <p className="text-slate-500">Loading River's plan...</p>}

        {error && <p className="rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}

        {!isLoading && !error && todos.length === 0 && (
          <p className="text-slate-500">
            No exercises assigned to River yet. Tap + to assign one.
          </p>
        )}

        {!isLoading && !error && todos.length > 0 && visibleTodos.length === 0 && (
          <p className="text-slate-500">
            {tab === 'todo'
              ? 'River has completed everything you assigned.'
              : 'River has not completed any exercises yet.'}
          </p>
        )}

        {visibleTodos.length > 0 && (
          <TodoList
            todos={visibleTodos}
            onDelete={deleteTodoById}
            onEdit={editTodoById}
            onToggle={toggleTodoById}
          />
        )}
      </main>

      <BottomNav onAddClick={() => setShowCreate(!showCreate)} />
    </div>
  )
}

export default App
