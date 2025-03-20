import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import WatchedList from "./components/WatchedList";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Box from "./components/Box";
import WatchedListHeader from "./components/WatchedListHeader";
import Search from "./components/Search";
import ResultStats from "./components/ResultStats";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SelectedMovie from "./components/SelectedMovie";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const API_KEY = "b5321cec";

  const moviesAPI = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
  const searchParameter = "s=";

  const controller = new AbortController();

  const movieWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  function handleAddMovie(movieData) {
    movieWatched
      ? setWatched((watched) =>
          watched.map((movie) =>
            movie.imdbID === movieData.imdbID ? movieData : movie
          )
        )
      : setWatched((watched) => [...watched, movieData]);
    setSelectedId(null);
  }

  function handleSelectMovie(id) {
    setSelectedId((selId) => (selId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleSearch(e) {
    e.preventDefault();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(moviesAPI + searchParameter + query, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Something went wrong.");

        const data = await res.json();

        if (data.Response === "False")
          throw new Error("No movie found. Try searching for something else");
        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(moviesAPI + searchParameter + "Inception", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Something went wrong.");

        const data = await res.json();

        if (data.Response === "False")
          throw new Error("No movie found. Try searching for something else");
        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    });
  }, []);

  const moviesLength = movies ? movies.length : 0;

  return (
    <>
      <Navbar moviesLength={moviesLength} query={query} setQuery={setQuery}>
        <Search query={query} setQuery={setQuery} onSearch={handleSearch} />
        <ResultStats moviesLength={moviesLength} />
      </Navbar>
      <Main>
        <Box isOpenDefault={true}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box isOpenDefault={true}>
          {!!selectedId ? (
            <SelectedMovie
              onAddMovie={handleAddMovie}
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              movieWatched={movieWatched}
            />
          ) : (
            <>
              <WatchedListHeader watched={watched} />
              <WatchedList watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
