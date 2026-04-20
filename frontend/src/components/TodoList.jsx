import TodoItem from './TodoItem'

function TodoList({ todos, updateTodo, deleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="grid min-h-[280px] place-items-center rounded-[1.75rem] border border-dashed border-slate-300 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.18),_transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.7))] px-6 text-center">
        <div className="max-w-sm">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-[1.75rem] bg-slate-900 text-3xl font-semibold text-white shadow-[0_18px_30px_rgba(15,23,42,0.25)]">
            +
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">Your board is clear</h3>
          <p className="mt-3 text-base leading-7 text-slate-500">
            Add the next task above and start building momentum with a sharper daily flow.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ul className="grid gap-3">
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  )
}

export default TodoList
