import { useEffect, useState } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import StarRating from "./StarRating";

export default function SelectedMovie({
  selectedId,
  onCloseMovie,
  onAddMovie,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);

  const {
    imdbID,
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const API_KEY = "b5321cec";

  const moviesAPI = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(moviesAPI + "i=" + selectedId);

        if (!res.ok) throw new Error("Something went wrong.");
        const data = await res.json();
        if (data.Response === "False")
          throw new Error("No movie found. Try searching for something else");
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [selectedId]);

  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &times;
      </button>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <header>
            <img src={poster} alt="Poster" />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐ {imdbRating} on IMDb</p>
              <button
                className="btn-add"
                onClick={() => {
                  onAddMovie({
                    imdbID,
                    title,
                    poster,
                    runtime,
                    imdbRating,
                    plot,
                    released,
                    actors,
                    director,
                    genre,
                    userRating,
                  });
                }}
              >
                Add Movie To Watchlist
              </button>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating setUserRating={setUserRating} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
