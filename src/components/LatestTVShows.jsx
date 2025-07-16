import { useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import MoviePagination from "./MoviePagination";
import { BeatLoader } from "react-spinners";
import { fetchTVGenres } from "../services/fetchTVGenres";
import { fetchLatestTVShows } from "../services/fetchLatestMedia";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

const LatestTVShows = () => {
  const [latestTVShows, setLatestTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(latestTVShows, "latest from tmdb");

  const [debouncedPageNumber, setDebouncedPageNumber] = useState(1);

  const fetchLatest = async () => {
    setLoading(true);
    setError("");
    try {
      const latestTVShowsRes = await fetchLatestTVShows(debouncedPageNumber);

      console.log("latest TV shows res from tmdb", latestTVShowsRes);
      // Check if the response is ok
      // If not, throw an error
      if (!latestTVShowsRes.status === "fulfilled") {
        setError("Error Loading Latest TV Shows!!!");
        throw new Error("Network response for latest TV shows was not ok");
      }

      // If the response is ok, parse the JSON
      // and set the movies state to the results from the API

      const latestTVShows = await latestTVShowsRes.json();

      console.log("latest TV shows from tmdb data", latestTVShows);

      if (latestTVShows.length === 0) {
        setError("No Latest To Show");
        throw new Error("No latest found");
      }

      const tvShowsGenresRes = await fetchTVGenres();

      const tvShowsGenres = (await tvShowsGenresRes.json()).genres;
      console.log("TV shows genres", tvShowsGenres);

      const latestTVShowsWithGenres = latestTVShows.results.map((latest) => {
        const genres = latest.genre_ids.map((id) =>
          tvShowsGenres.find((genre) => genre.id == id),
        );

        return { ...latest, genres };
      });

      console.log("latest TV shows with genres ", latestTVShowsWithGenres);
      setLatestTVShows(latestTVShowsWithGenres);
    } catch (error) {
      // If there is an error, log it to the console
      setError("Error Loading TV Shows!!!");
      console.error("Error fetching TV shows:", error);
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
        {latestTVShows.map((show) => (
          <MediaCard key={show.id} media={show} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="popular mt-10 flex flex-col gap-10 p-8 sm:mt-15">
        <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
          Latest TV Shows
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

export default LatestTVShows;
