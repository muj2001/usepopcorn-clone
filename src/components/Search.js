import { useRef, useEffect } from "react";

export default function Search({ query, setQuery, onSearch }) {
  const searchEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      document.addEventListener("keydown", (e) => {
        if (e.code === "ArrowUp") {
          searchEl.current.focus();
        }
      });
    }
    searchEl.current.focus();
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  return (
    <form onSubmit={onSearch}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={searchEl}
      />
      <button style={{ display: "none" }}></button>
    </form>
  );
}
