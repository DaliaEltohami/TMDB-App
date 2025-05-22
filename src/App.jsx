import movieLogo from "./assets/logo.svg";
import heroImage from "./assets/hero-img.png";
import "./App.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import TrendingMovieCard from "./components/TrendingMovieCard";
import MoviePagination from "./components/MoviePagination";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_MOVIES_API_URL = import.meta.env.VITE_TMDB_MOVIES_BASE_URL;

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [debouncedPageNumber, setDebouncedPageNumber] = useState(1);

  const fetchMovies = async () => {
    console.log("debouncedPageNumber", debouncedPageNumber);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${TMDB_MOVIES_API_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=${debouncedPageNumber}`,
        API_OPTIONS,
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
        throw new Error("No movies found");
      }

      const MoviesWithGenres = await Promise.all(
        data.results.map(async (movie) => {
          try {
            const movieDetailsRes = await fetch(
              `${TMDB_MOVIES_API_URL}/movie/${movie.id}`,
              {
                method: "GET",
                headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                },
              },
            );

            if (!movieDetailsRes.ok) {
              throw new Error("Response was not Ok!!!");
            }

            const movieDetails = await movieDetailsRes.json();

            return { ...movie, genres: movieDetails.genres || [] };
          } catch (error) {
            console.error("Error Fetching Genres For Movie", movie.id);
            return { ...movie, genres: [] };
          }
        }),
      );

      setMovies(MoviesWithGenres);
    } catch (error) {
      // If there is an error, log it to the console
      setError("Error Loading Movies!!!");
      console.error("Error fetching movies:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [debouncedPageNumber]);

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
          {" "}
          <p className="text-3xl font-bold text-red-600">{error}</p>;
        </div>
      );
    }
    return (
      <div className="popular-movies grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
            overview={movie.overview}
            rating={movie.vote_average}
            genres={movie.genres}
            posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-pattern-bg absolute top-0 z-0 h-screen w-screen bg-cover bg-center"></div>
      <div className="relative z-10 container mx-auto">
        <header className="mt-4 flex flex-col items-center justify-center px-4 py-3 shadow md:mt-6 md:px-6 md:py-4 lg:px-8 lg:py-5">
          <div className="flex items-center">
            <img src={movieLogo} alt="Logo" className="h-8 md:h-10" />
          </div>

          <div className="flex items-center">
            <img src={heroImage} alt="Hero Image" className="h-50 md:h-100" />
          </div>
          <h1 className="font-dm-sans max-w-4xl text-center text-5xl leading-tight font-bold text-white sm:text-[64px] sm:leading-[76px]">
            Find <span className="text-gradient">Movies</span> You’ll Love
            Without the Hassle
          </h1>
          <Search />
        </header>
        <main className="mt-10 flex flex-col gap-7 px-8 sm:mt-15">
          <div className="trendings mt-10 flex flex-col gap-10 p-8 sm:mt-15">
            <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
              Trending Movies
            </h2>
            <div className="trending-movies grid grid-cols-1 justify-items-center gap-5 md:grid-cols-3 md:justify-items-start 2xl:grid-cols-6">
              <TrendingMovieCard />
              <TrendingMovieCard />
              <TrendingMovieCard />
              <TrendingMovieCard />
              <TrendingMovieCard />
              <TrendingMovieCard />
            </div>
          </div>
          <div className="popular mt-10 flex flex-col gap-10 p-8 sm:mt-15">
            <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
              Popular Movies
            </h2>
            {renderMovies()}
          </div>
          <div className="pagination p-8">
            <MoviePagination
              debouncedPageNumber={debouncedPageNumber}
              setDebouncePageNumber={setDebouncedPageNumber}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;

//const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.asc';
