import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import MediaCard from "./MediaCard";
import MoviePagination from "./MoviePagination";
import { fetchMovieGenres } from "../services/fetchMovieGenres";

import { fetchAllTVShows } from "../services/fetchAllTVShows";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

const PopularTVShows = () => {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [debouncedPageNumber, setDebouncedPageNumber] = useState(1);

  const fetchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const TVShowsRes = await fetchAllTVShows(debouncedPageNumber);
      // Check if the response is ok
      // If not, throw an error
      if (!TVShowsRes.ok) {
        setError("Error Loading TV Shows!!!");
        throw new Error("Network response was not ok");
      }

      // If the response is ok, parse the JSON
      // and set the movies state to the results from the API

      const TVShows = await TVShowsRes.json();

      if (TVShows.results.length === 0) {
        setError("No TV Shows To Show");
        throw new Error("No TV shows found");
      }

      const moviesGenresRes = await fetchMovieGenres();

      const moviesGenres = (await moviesGenresRes.json()).genres;

      const TVShowsWithGenres = TVShows.results.map((TVShow) => {
        const genres = TVShow.genre_ids.map((id) =>
          moviesGenres.find((genre) => genre.id == id),
        );

        return { ...TVShow, genres };
      });

      setTVShows(TVShowsWithGenres);
    } catch (error) {
      // If there is an error, log it to the console
      setError("Error Loading TV Shows!!!");
      console.error("Error fetching TV shows:", error);
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
      <div className="popular-tv-shows grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tvShows.map((TVShow) => (
          <MediaCard key={TVShow.id} media={TVShow} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="popular mt-10 flex flex-col gap-10 p-8 sm:mt-15">
        <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
          Popular TV Shows
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

export default PopularTVShows;
