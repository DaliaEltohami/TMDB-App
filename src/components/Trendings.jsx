import React, { useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import MoviePagination from "./MoviePagination";
import { BeatLoader } from "react-spinners";
import { fetchMovieGenres } from "../services/fetchMovieGenres";
import { fetchTrendingsFromTMDB } from "../services/fetchTrendingsFromTMDB";
import { fetchTVGenres } from "../services/fetchTVGenres";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

const Trendings = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [debouncedPageNumber, setDebouncedPageNumber] = useState(1);

  const fetchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const moviesRes = await fetchTrendingsFromTMDB();

      console.log("trendings from tmdb", moviesRes);
      // Check if the response is ok
      // If not, throw an error
      if (!moviesRes.ok) {
        setError("Error Loading Movies!!!");
        throw new Error("Network response was not ok");
      }

      // If the response is ok, parse the JSON
      // and set the movies state to the results from the API

      const movies = await moviesRes.json();
      console.log("trendings from tmdb data", movies);

      if (movies.results.length === 0) {
        setError("No Movies To Show");
        throw new Error("No movies found");
      }

      const [moviesGenresRes, tvGenresRes] = await Promise.allSettled([
        fetchMovieGenres(),
        fetchTVGenres(),
      ]);

      //   if (moviesGenresRes.status !== "fulfilled" || !moviesGenresRes.value.ok) {
      //     setError("Error Loading Movies Genres!!!");
      //   }

      const tvGenres = (await tvGenresRes.value.json()).genres;
      console.log("tv genres", tvGenres);

      const moviesGenres = (await moviesGenresRes.value.json()).genres;
      console.log("movies genres", moviesGenres);

      const allGenres = [...moviesGenres, ...tvGenres];
      console.log("Combined genres", allGenres);

      const MoviesWithGenres = movies.results.map((movie) => {
        const genres = movie.genre_ids.map((id) =>
          allGenres.find((genre) => genre.id == id),
        );

        return { ...movie, genres };
      });

      console.log("Trendings data with genres ", MoviesWithGenres);
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
          <p className="text-3xl font-bold text-red-600">{error}</p>;
        </div>
      );
    }
    return (
      <div className="popular-movies grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="popular mt-10 flex flex-col gap-10 p-8 sm:mt-15">
        <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
          Trendings
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
    </>
  );
};

export default Trendings;
