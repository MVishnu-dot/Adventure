export default function SearchBar() {
  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-4 shadow-xl">
        <svg
          className="w-5 h-5 text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search adventures, locations, experiences…"
          className="w-full bg-transparent outline-none text-white placeholder-gray-300"
        />
      </div>
    </div>
  );
}
