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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex overflow-hidden rounded-[1.4rem] border border-white/60 bg-white/90 shadow-[0_16px_40px_rgba(31,41,55,0.12)] backdrop-blur">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add the next task worth finishing"
          className="flex-1 bg-transparent px-5 py-4 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          className="m-2 rounded-[1rem] bg-slate-900 px-6 py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-orange-500"
        >
          Create
        </button>
      </div>
      <p className="px-1 text-sm text-slate-500">
        Double-click a task to edit it. Use filters to focus the board.
      </p>
    </form>
  )
}

export default TodoInput
