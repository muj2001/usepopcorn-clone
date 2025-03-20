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
  // Movie Posters API = http://img.omdbapi.com/?apikey=[yourkey]&

  const searchParameter = "s=";

  function handleAddMovie(movieData) {
    setWatched((watched) => [...watched, movieData]);
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
        const res = await fetch(moviesAPI + searchParameter + query);

        if (!res.ok) throw new Error("Something went wrong.");

        const data = await res.json();

        if (data.Response === "False")
          throw new Error("No movie found. Try searching for something else");
        setMovies(data.Search);
      } catch (error) {
        setError(error.message);
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
        const res = await fetch(moviesAPI + searchParameter + "Inception");

        if (!res.ok) throw new Error("Something went wrong.");

        const data = await res.json();

        if (data.Response === "False")
          throw new Error("No movie found. Try searching for something else");
        setMovies(data.Search);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
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
            />
          ) : (
            <>
              <WatchedListHeader watched={watched} />
              <WatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
