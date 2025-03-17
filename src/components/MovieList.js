import { useState } from "react";
import Movie from "./Movie";

export default function MovieList({ movies }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <ul className="list">
          {movies?.map((movie) => (
            <Movie movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}
