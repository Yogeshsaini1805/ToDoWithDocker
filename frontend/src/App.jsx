import { useState, useEffect } from 'react'
import axios from 'axios'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Filter from './components/Filter'

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL
const API_BASE_URL = rawApiBaseUrl?.includes('://backend:')
  ? rawApiBaseUrl.replace('://backend:', '://localhost:')
  : rawApiBaseUrl || 'http://localhost:5000'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`)
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (text) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, { text })
      setTodos([...todos, response.data])
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const updateTodo = async (id, updates) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, updates)
      setTodos(todos.map(todo => todo._id === id ? response.data : todo))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`)
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const pendingCount = todos.length - completedCount

  return (
    <div className="min-h-screen app-shell px-4 py-8 sm:px-6 lg:px-8">
      <div className="ambient ambient-a"></div>
      <div className="ambient ambient-b"></div>
      <div className="relative mx-auto max-w-5xl">
        <section className="hero-panel overflow-hidden rounded-[2rem] border border-white/45 p-6 shadow-[0_30px_80px_rgba(38,33,65,0.18)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-sm backdrop-blur">
                Daily Focus Board
              </div>
              <div className="space-y-4">
                <h1 className="max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-900 sm:text-6xl">
                  Structure the day before the day runs you.
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  Plan the next action, keep momentum visible, and clear the backlog with a board that feels alive.
                </p>
              </div>
              <TodoInput addTodo={addTodo} />
            </div>

            <div className="stats-panel grid gap-4 rounded-[1.75rem] border border-white/55 bg-white/55 p-5 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="stat-card">
                  <span className="stat-label">Total</span>
                  <span className="stat-value">{todos.length}</span>
                  <span className="stat-meta">Tasks in motion</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Done</span>
                  <span className="stat-value">{completedCount}</span>
                  <span className="stat-meta">Closed with intent</span>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-slate-900 px-5 py-5 text-white shadow-[0_18px_35px_rgba(15,23,42,0.25)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Active Queue</p>
                    <p className="mt-2 text-4xl font-black tracking-tight">{pendingCount}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm text-slate-200">
                    {pendingCount === 0 ? 'Clear' : 'In Progress'}
                  </div>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 transition-all duration-500"
                    style={{ width: `${todos.length === 0 ? 0 : (completedCount / todos.length) * 100}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  {todos.length === 0
                    ? 'Add a few tasks to activate your board.'
                    : `${completedCount} of ${todos.length} tasks completed.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/45 bg-white/70 p-5 shadow-[0_22px_60px_rgba(59,46,105,0.12)] backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Task View</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Keep the list moving</h2>
            </div>
            <Filter filter={filter} setFilter={setFilter} />
          </div>
        {loading ? (
          <div className="grid min-h-[280px] place-items-center rounded-[1.5rem] border border-dashed border-slate-300/80 bg-white/55 text-center">
            <div>
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-orange-500"></div>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Loading board</p>
            </div>
          </div>
        ) : (
          <TodoList todos={filteredTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        )}
        </section>
      </div>
    </div>
  )
}

export default App
