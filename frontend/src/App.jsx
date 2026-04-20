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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Todo App</h1>
        <TodoInput addTodo={addTodo} />
        <Filter filter={filter} setFilter={setFilter} />
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading todos...</p>
          </div>
        ) : (
          <TodoList todos={filteredTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        )}
      </div>
    </div>
  )
}

export default App
