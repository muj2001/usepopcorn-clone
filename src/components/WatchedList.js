import { useState } from "react";
import WatchedListHeader from "./WatchedListHeader";
import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ watched }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          <WatchedListHeader watched={watched} />

          <ul className="list">
            {watched.map((movie) => (
              <WatchedMovie movie={movie} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
