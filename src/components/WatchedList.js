import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ watched, setWatched }) {
  function handleDeleteMovie(id) {
    console.log("Here");
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          onDeleteMovie={handleDeleteMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
