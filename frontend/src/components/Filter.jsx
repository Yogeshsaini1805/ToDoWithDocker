function Filter({ filter, setFilter }) {
  return (
    <div className="inline-flex flex-wrap gap-2 rounded-full border border-slate-200/80 bg-slate-100/80 p-1.5 shadow-inner">
      {['all', 'pending', 'completed'].map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`rounded-full px-4 py-2 text-sm font-semibold capitalize tracking-wide transition-all duration-200 ${
            filter === f
              ? 'bg-slate-900 text-white shadow-[0_10px_20px_rgba(15,23,42,0.25)]'
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}

export default Filter
