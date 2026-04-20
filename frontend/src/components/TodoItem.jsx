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
    <li className={`todo-item group flex flex-col gap-4 rounded-[1.5rem] border p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition duration-300 sm:flex-row sm:items-center ${
      todo.completed
        ? 'border-emerald-200 bg-emerald-50/80'
        : 'border-white/70 bg-white/90'
    }`}>
      <button
        type="button"
        onClick={handleToggle}
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition duration-200 ${
          todo.completed
            ? 'border-emerald-500 bg-emerald-500 text-white shadow-[0_10px_20px_rgba(16,185,129,0.25)]'
            : 'border-slate-300 bg-slate-50 text-slate-400 hover:border-orange-400 hover:text-orange-500'
        }`}
      >
        <span className="text-lg font-bold">{todo.completed ? '✓' : '○'}</span>
      </button>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
            todo.completed
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-orange-100 text-orange-700'
          }`}>
            {todo.completed ? 'Completed' : 'Active'}
          </span>
        </div>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none ring-0 transition focus:border-orange-400"
            autoFocus
          />
        ) : (
          <button
            type="button"
            className={`block text-left text-lg font-semibold tracking-tight transition ${
              todo.completed ? 'text-slate-500 line-through' : 'text-slate-900'
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </button>
        )}
      </div>
      <div className="flex gap-2 sm:ml-4">
        <button
          onClick={handleEdit}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-rose-600"
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
