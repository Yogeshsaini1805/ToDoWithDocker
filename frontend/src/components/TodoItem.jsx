import { useState } from 'react'

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleToggle = () => {
    updateTodo(todo._id, { completed: !todo.completed })
  }

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      updateTodo(todo._id, { text: editText.trim() })
    }
    setIsEditing(!isEditing)
  }

  const handleDelete = () => {
    deleteTodo(todo._id)
  }

  return (
    <li className="todo-item flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="mr-4 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'} transition-colors duration-200`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      <div className="flex space-x-2 ml-4">
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem