import { useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import MoviePagination from "./MoviePagination";
import { BeatLoader } from "react-spinners";
import { fetchMovieGenres } from "../services/fetchMovieGenres";
import { fetchTVGenres } from "../services/fetchTVGenres";
import {
  fetchLatestMovies,
  fetchLatestTVShows,
} from "../services/fetchLatestMedia";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

const Latest = () => {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(latest, "latest from tmdb");

  const [debouncedPageNumber, setDebouncedPageNumber] = useState(1);

  const fetchLatest = async () => {
    setLoading(true);
    setError("");
    try {
      const latestRes = await Promise.allSettled([
        fetchLatestTVShows(debouncedPageNumber),
        fetchLatestMovies(debouncedPageNumber),
      ]);

      console.log("latest res from tmdb", latestRes);
      // Check if the response is ok
      // If not, throw an error
      if (
        !latestRes[0].status === "fulfilled" ||
        !latestRes[1].status === "fulfilled"
      ) {
        setError("Error Loading Latest!!!");
        throw new Error("Network response for latest was not ok");
      }

      // If the response is ok, parse the JSON
      // and set the movies state to the results from the API

      const latestMovies = await latestRes[0].value.json();
      const latestTVShows = await latestRes[1].value.json();
      console.log("latest movies from tmdb data", latestMovies);
      console.log("latest tv shows from tmdb data", latestTVShows);

      const allLatest = [...latestMovies.results, ...latestTVShows.results];

      console.log("all latest", allLatest);

      if (allLatest.length === 0) {
        setError("No Latest To Show");
        throw new Error("No latest found");
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

      const latestWithGenres = allLatest.map((latest) => {
        const genres = latest.genre_ids.map((id) =>
          allGenres.find((genre) => genre.id == id),
        );

        return { ...latest, genres };
      });

      console.log("latest data with genres ", latestWithGenres);
      setLatest(latestWithGenres);
    } catch (error) {
      // If there is an error, log it to the console
      setError("Error Loading Movies!!!");
      console.error("Error fetching movies:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchLatest();
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
        {latest.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="popular mt-10 flex flex-col gap-10 p-8 sm:mt-15">
        <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
          Latest
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

export default Latest;
