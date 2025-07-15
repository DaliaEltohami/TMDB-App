import { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/search.svg";
import { BeatLoader } from "react-spinners";
import MediaCard from "./MediaCard.jsx";
import MoviePagination from "./MoviePagination";
import { updateAppwriteTrendingMovies } from "../utils/updateSearchMovies.js";
import { fetchMovieGenres } from "../services/fetchMovieGenres.js";
import { fetchTVGenres } from "../services/fetchTVGenres.js";
import { fetchSearchMovies } from "../services/fetchSearchMovies.js";

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

      console.log("search data from tmdb", data);

      if (data.results.length === 0) {
        setError("No Movies To Show");
        setMaxPageNumber(0);
        throw new Error("No movies found");
      }

      const [moviesGenresRes, tvGenresRes] = await Promise.allSettled([
        fetchMovieGenres(),
        fetchTVGenres(),
      ]);
      const tvGenres = (await tvGenresRes.value.json()).genres;
      const movieGenres = (await moviesGenresRes.value.json()).genres;
      const allGenres = [...movieGenres, ...tvGenres];

      const searchDataWithGenres = data.results.map((item) => {
        const genres = item.genre_ids?.map((id) =>
          allGenres.find((genre) => genre.id == id),
        );

        return { ...item, genres };
      });

      console.log("search data with genres", searchDataWithGenres);

      setMovies(searchDataWithGenres);
      setMaxPageNumber(data.total_pages);
      if (isNewSearch.current && searchDataWithGenres.length > 0) {
        console.log("in is new search check");
        updateAppwriteTrendingMovies(searchDataWithGenres[0]);
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
            <MediaCard key={movie.id} media={movie} />
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
