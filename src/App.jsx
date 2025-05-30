import movieLogo from "./assets/logo.svg";
import heroImage from "./assets/hero-img.png";
import noPoster from "./assets/no-movie.png";
import "./App.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import TrendingMovies from "./components/TrendingMovies.jsx";
import MoviePagination from "./components/MoviePagination";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { fetchAllMovies } from "./sevices/fetchAllMovies.js";
import { fetchMovieDetails } from "./sevices/fetchMovieDetails.js";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [debouncedPageNumber, setDebouncedPageNumber] = useState(1);

  const fetchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchAllMovies(debouncedPageNumber);
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
            posterPath={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : noPoster
            }
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
            <TrendingMovies />
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
              maxPageNumber={500}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;

//const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.asc';
