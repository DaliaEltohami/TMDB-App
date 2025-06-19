import ratingIcon from "../assets/Rating.svg";
import { Link, useParams } from "react-router";
import noPoster from "../assets/no-media.png";
import { BeatLoader } from "react-spinners";
import { FaArrowRightLong } from "react-icons/fa6";
import useMovieDetails from "../hooks/useMovieDetails";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

// Add this helper function above your component
const formatRuntime = (minutes) => {
  if (!minutes || isNaN(minutes)) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}min`;
};

const TVShowDetails = () => {
  const params = useParams();
  const { movie, loading, error } = useMovieDetails(params.id);

  const renderMovie = () => {
    console.log(movie);
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
      <div className="movie-details-modal bg-primary flex items-center justify-center text-white">
        <div className="movie-details-modal-content text-light-100 bg-primary shadow-light-200/50 shadow-modal relative m-20 rounded-2xl p-20 2xl:w-3/4">
          <div className="movie-details-modal-header mb-5 flex flex-col items-start gap-2.5 md:mb-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-[min(10vw,70px)] font-bold text-white">
              {movie.title}
            </h2>
            <div className="bg-dark-100 flex items-center justify-between gap-2 px-5 py-2 md:rounded-2xl">
              <span className="rating-icon">
                <img src={ratingIcon} alt="rating icon" />
              </span>
              <span className="rating font-bold text-white">
                {Math.floor(movie.vote_average * 10) / 10}
              </span>
              <span>/ 10</span>
            </div>
          </div>
          <div className="movie-details-modal-meta text-light-200 mb-4 flex flex-wrap items-center gap-4 text-lg">
            <span>
              {movie.release_date ? movie.release_date.slice(0, 4) : ""}
            </span>
            {movie.cert && (
              <span className="bg-dark-200 rounded px-2 py-1">
                {movie.cert}
              </span>
            )}
            <span>{formatRuntime(movie.runtime)}</span>
            {movie.genres && movie.genres.length > 0 && (
              <span className="text-light-300 italic">
                {movie.genres.map((g) => g.name).join(", ")}
              </span>
            )}
          </div>
          <div className="movie-details-modal-main mb-6 flex flex-col gap-6 md:flex-row">
            <div className="movie-details-modal-poster h-[320px] w-full flex-shrink-0 overflow-hidden rounded-2xl shadow-lg md:w-1/3">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noPoster
                }
                alt="movie poster"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="movie-details-modal-overview flex flex-1 flex-col gap-4">
              <div>
                <h5 className="text-light-100 mb-1 text-lg font-semibold">
                  Overview
                </h5>
                <p className="text-white">{movie.overview || "N/A"}</p>
              </div>
              <div>
                <h5 className="text-light-100 mb-1 text-lg font-semibold">
                  Key Details
                </h5>
                <ul className="space-y-1 text-white">
                  <li>
                    <span className="font-semibold">Release Date:</span>{" "}
                    {movie.release_date || "N/A"}
                  </li>
                  <li>
                    <span className="font-semibold">Status:</span>{" "}
                    {movie.status || "N/A"}
                  </li>
                  {movie.production_countries &&
                    movie.production_countries.length > 0 && (
                      <li>
                        <span className="font-semibold">Countries:</span>{" "}
                        {movie.production_countries
                          .map((c) => c.name)
                          .join(", ")}
                      </li>
                    )}
                  {movie.spoken_languages &&
                    movie.spoken_languages.length > 0 && (
                      <li>
                        <span className="font-semibold">Languages:</span>{" "}
                        {movie.spoken_languages
                          .map((l) => l.english_name)
                          .join(", ")}
                      </li>
                    )}
                  {movie.production_companies &&
                    movie.production_companies.length > 0 && (
                      <li>
                        <span className="font-semibold">
                          Production Companies:
                        </span>{" "}
                        {movie.production_companies
                          .map((p) => p.name)
                          .join(", ")}
                      </li>
                    )}
                </ul>
              </div>
            </div>
          </div>
          <div className="home-button text-right">
            <Link to="/">
              <button className="flex cursor-pointer items-center gap-3 rounded-xl bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] px-4 py-2 font-bold text-white">
                Home Page
                <FaArrowRightLong />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return renderMovie();
};

export default TVShowDetails;
