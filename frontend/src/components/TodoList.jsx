import TodoItem from './TodoItem'

function TodoList({ todos, updateTodo, deleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-gray-500 text-lg">No todos yet. Add one above!</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  )
}

export default TodoList