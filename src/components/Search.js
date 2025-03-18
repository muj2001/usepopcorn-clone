export default function Search({ query, setQuery, onSearch }) {
  return (
    <form onSubmit={onSearch}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button style={{ display: "none" }}></button>
    </form>
  );
}
