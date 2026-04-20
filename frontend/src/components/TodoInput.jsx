import { useState } from 'react'

function TodoInput({ addTodo }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex shadow-lg rounded-lg overflow-hidden">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 border-0 focus:outline-none focus:ring-0 text-gray-700"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default TodoInput