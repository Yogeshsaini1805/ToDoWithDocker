function Filter({ filter, setFilter }) {
  return (
    <div className="flex justify-center mb-6 space-x-2">
      {['all', 'pending', 'completed'].map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            filter === f
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default Filter