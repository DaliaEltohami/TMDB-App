import { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/search.svg";
import { fetchMovieDetails } from "../services/fetchMovieDetails.js";
import { fetchSearchMovies } from "../services/fetchSearchMovies.js";
import { BeatLoader } from "react-spinners";
import MovieCard from "./MovieCard";
import MoviePagination from "./MoviePagination";
import { updateSearchMovies } from "../utils/updateSearchMovies";
import noPoster from "../assets/no-movie.png";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPageNumber, setMaxPageNumber] = useState(0);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [debouncedPageNumber, setDebouncedPageNumber] = useState(1);

  const isNewSearch = useRef(true);

  const fetchMovies = async () => {
    console.log("in side Fetch Movies");
    console.log("debounced search term", debouncedSearchTerm);
    console.log("debounced page number", debouncedPageNumber);
    console.log("Is new search", isNewSearch);
    setLoading(true);
    setError("");
    try {
      const res = await fetchSearchMovies(
        debouncedSearchTerm,
        debouncedPageNumber,
      );
      // Check if the response is ok
      // If not, throw an error
      if (!res.ok) {
        setError("Error Loading Movies!!!");
        throw new Error("Network response was not ok");
      }

      // If the response is ok, parse the JSON
      // and set the movies state to the results from the API

      const data = await res.json();
      console.log("data", data);

      if (data.results.length === 0) {
        setError("No Movies To Show");
        setMaxPageNumber(0);
        throw new Error("No movies found");
      }

      const moviesWithGenres = await Promise.all(
        data.results.map(async (movie) => {
          try {
            const movieDetailsRes = await fetchMovieDetails(movie.id);

            if (!movieDetailsRes.ok) {
              throw new Error("Response was not Ok!!!");
            }

            const movieDetails = await movieDetailsRes.json();
            return { ...movie, genres: movieDetails.genres || [] };
          } catch (error) {
            console.error("Error Fetching Genres For Movie", movie.id);
            console.log(error.message);
            return { ...movie, genres: [] };
          }
        }),
      );

      setMovies(moviesWithGenres);
      setMaxPageNumber(data.total_pages);
      if (isNewSearch.current && moviesWithGenres.length > 0) {
        console.log("in is new search check");
        updateSearchMovies(moviesWithGenres[0]);
        isNewSearch.current = false;
      }
    } catch (err) {
      // If there is an error, log it to the console
      if (error) console.error(error);
      else console.error("Error fetching movies:", err.message);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      fetchMovies();
    }
  }, [debouncedSearchTerm, debouncedPageNumber]);

  useEffect(() => {}, [debouncedSearchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setDebouncedPageNumber(1);
      isNewSearch.current = true;
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const renderMovies = () => {
    if (loading) {
      return (
        <div className="flex justify-center">
          <BeatLoader
            color={color}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center">
          <p className="text-light-200 text-3xl font-bold">{error}</p>;
        </div>
      );
    }
    return (
      <>
        <div className="search-movies grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              overview={movie.overview}
              rating={movie.vote_average}
              genres={movie.genres}
              posterPath={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : noPoster
              }
            />
          ))}
        </div>
        <MoviePagination
          debouncedPageNumber={debouncedPageNumber}
          setDebouncePageNumber={setDebouncedPageNumber}
          maxPageNumber={maxPageNumber}
        />
      </>
    );
  };
  return (
    <>
      <div className="bg-dark-100 mt-2 flex w-3/4 justify-center gap-4 rounded-lg px-3 py-2 sm:mt-4 sm:w-1/2 sm:px-4 sm:py-4">
        <img src={searchIcon} alt="search icon" className="" />
        <input
          type="text"
          placeholder="Search through 300+ movies online"
          className="text-light-200 flex-1 bg-transparent outline-hidden"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {debouncedSearchTerm && (
        <div className="search mt-10 flex w-full flex-col gap-10 p-8 sm:mt-15">
          <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
            Search Results
          </h2>
          {renderMovies()}
        </div>
      )}
    </>
  );
};

export default Search;
