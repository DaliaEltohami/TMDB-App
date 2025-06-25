import { useEffect, useState } from "react";
import fetchTrendingMovies from "../services/fetchTrendingMovies.js";
import { BeatLoader } from "react-spinners";
import TrendingMovieCard from "./TrendingMovieCard.jsx";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

const TrendingSearchMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTrendings = async () => {
    setTrendingMovies([]);
    setError("");
    setLoading("");
    try {
      const trendingsRequest = await fetchTrendingMovies();

      setTrendingMovies(trendingsRequest.documents.slice(0, 6));
    } catch (error) {
      setError("Error Loading Trendings");
      console.log(error.message);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchTrendings();
  }, []);

  const renderTrendings = () => {
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
    if (trendingMovies.length > 0) {
      return (
        <div className="trendings mt-10 flex flex-col gap-10 p-8 sm:mt-15">
          <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
            Trending Search Movies
          </h2>
          <div className="trending-movies grid grid-cols-1 justify-items-center gap-5 md:grid-cols-3 md:justify-items-start 2xl:grid-cols-6">
            {trendingMovies.map((movie, i) => (
              <TrendingMovieCard key={movie.$id} movie={movie} index={i} />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <p className="text-light-200 text-3xl font-bold">
          No Trending Movies Yet!
        </p>
      </div>
    );
  };

  return renderTrendings();
};

export default TrendingSearchMovies;
