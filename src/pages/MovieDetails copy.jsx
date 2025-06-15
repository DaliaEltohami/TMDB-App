import ratingIcon from "../assets/Rating.svg";
import poster from "../assets/sonic3.jpg";
import { Link, useNavigate, useParams } from "react-router";
import noPoster from "../assets/no-movie.png";
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

const MovieDetails = ({ isModal }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetails(params.id);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : noPoster;
  const trailer = movie.trailer
    ? `https://www.youtube.com/embed/${movie.trailer}`
    : null;

  const genres = movie.genres ? movie.genres.map((g) => g.name).join(", ") : "";
  const countries = movie.production_countries
    ? movie.production_countries.map((c) => c.name).join(", ")
    : "";
  const languages = movie.spoken_languages
    ? movie.spoken_languages.map((l) => l.english_name).join(", ")
    : "";
  const companies = movie.production_companies
    ? movie.production_companies.map((c) => c.name).join(", ")
    : "";

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
  const cert = movie.cert || "";
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`
    : "";

  const rating = movie.vote_average
    ? Math.floor(movie.vote_average * 10) / 10
    : "";

  const movieDetailsModalJSX = (
    <div className="movie-details-modal fixed top-0 z-10 flex h-screen w-screen items-center justify-center text-white">
      <div
        className="overlay bg-primary fixed top-0 left-0 h-full w-full opacity-65"
        onClick={() => navigate(-1)}
      ></div>
      <div className="movie-details-modal-content text-light-100 bg-primary shadow-light-200/50 shadow-modal relative z-1 h-4/5 w-4/5 overflow-scroll rounded-2xl p-15 2xl:h-6/7 2xl:w-4/6">
        <div
          className="text-bold text-light-100 absolute top-1 right-4 cursor-pointer text-right text-2xl"
          onClick={() => navigate(-1)}
        >
          x
        </div>
        {/* Loading and error states */}
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="flex h-full w-full items-center justify-center text-red-500">
            <span>{error}</span>
          </div>
        ) : (
          <>
            <div className="movie-details-modal-header mb-5 flex flex-col items-start gap-2.5 md:mb-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-4xl font-bold text-white">
                {movie.title || movie.original_title}
              </h2>
              <div className="bg-dark-100 flex items-center justify-between gap-2 px-5 py-2 md:rounded-2xl">
                <span className="rating-icon">
                  <img src={ratingIcon} alt="rating icon" />
                </span>
                <span className="rating font-bold text-white">{rating}</span>
                <span>/ 10</span>
              </div>
            </div>
            <div className="movie-details-modal-sub-heading mb-5">
              <span>
                {year}
                {year && " •"}
              </span>
              <span>
                {cert}
                {cert && " •"}
              </span>
              <span>{runtime}</span>
            </div>
            <div className="movie-details-modal-images mb-5 flex w-full flex-col gap-5 gap-y-2.5 md:h-80 md:flex-row">
              <div className="movie-details-modal-poster h-[200px] w-full overflow-hidden rounded-2xl md:h-full md:flex-2/6">
                <img
                  src={poster}
                  alt="movie poster"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="movie-details-modal-trailer-poster h-[150px] overflow-hidden rounded-2xl md:h-full md:flex-4/6">
                {trailer ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={trailer}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full object-cover"
                  ></iframe>
                ) : (
                  <img
                    src={poster}
                    alt="movie poster"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="movie-details-modal-details">
              <div className="genres mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Genres: </h5>
                <p className="flex-4/5 text-white">{genres}</p>
              </div>
              <div className="overview mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Overview: </h5>
                <p className="flex-4/5 text-white">{movie.overview}</p>
              </div>
              <div className="release-date mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Release Date: </h5>
                <p className="flex-4/5 text-white">{movie.release_date}</p>
              </div>
              <div className="status mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Status: </h5>
                <p className="flex-4/5 text-white">{movie.status}</p>
              </div>
              <div className="countries mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Countries: </h5>
                <p className="flex-4/5 text-white">{countries}</p>
              </div>
              <div className="language mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Languages: </h5>
                <p className="flex-4/5 text-white">{languages}</p>
              </div>
              <div className="production-companies mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Production Companies: </h5>
                <p className="flex-4/5 text-white">{companies}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const movieDetailsPageJSX = () => {
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
          <div className="movie-details-modal-sub-heading mb-5">
            <span>{movie.release_date} • </span>
            <span>{movie.cert} • </span>
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
          <div className="movie-details-modal-images mb-5 flex w-full flex-col justify-between gap-10 gap-y-2.5 md:h-[400px] md:flex-row">
            <div className="movie-details-modal-poster h-[250px] w-full overflow-hidden rounded-2xl md:h-full md:w-1/5">
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
            <div className="movie-details-modal-trailer-poster h-[150px] overflow-hidden rounded-2xl md:h-full md:w-4/5">
              {movie.trailer ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${movie.trailer}`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={noPoster}
                  alt="movie poster"
                  className="h-full w-full object-cover"
                />
              )}
              <img
                src={poster}
                alt="movie poster"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="details-container flex flex-col justify-between md:flex-row">
            <div className="movie-details-modal-details p-2 md:w-4/6">
              <div className="genres mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Genres: </h5>
                <p className="flex-4/5 text-white">
                  {movie.genres && movie.genres.length > 0 ? (
                    movie.genres.map((g) => (
                      <span
                        key={g.id}
                        className="bg-dark-100 m-2 ml-0 inline-block rounded-full px-3 py-1 text-sm font-semibold text-white"
                      >
                        {g.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-white">N/A</span>
                  )}
                </p>
              </div>
              <div className="overview mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Overview: </h5>
                <p className="flex-4/5 text-white">{movie.overview || "N/A"}</p>
              </div>
              <div className="release-date mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Release Date: </h5>
                <p className="flex-4/5 text-white">
                  {movie.release_date || "N/A"}
                </p>
              </div>
              <div className="status mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Status: </h5>
                <p className="flex-4/5 text-white">{movie.status || "N/A"}</p>
              </div>
              <div className="countries mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Countries: </h5>
                <p className="flex-4/5 text-white">
                  {movie.production_countries &&
                  movie.production_countries.length > 0
                    ? movie.production_countries.map((c) => c.name).join(", ")
                    : "N/A"}
                </p>
              </div>
              <div className="language mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Languages: </h5>
                <p className="flex-4/5 text-white">
                  {movie.spoken_languages && movie.spoken_languages.length > 0
                    ? movie.spoken_languages
                        .map((l) => l.english_name)
                        .join(", ")
                    : "N/A"}
                </p>
              </div>
              <div className="production-companies mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Production Companies: </h5>
                <p className="flex-4/5 text-white">
                  {movie.production_companies &&
                  movie.production_companies.length > 0
                    ? movie.production_companies.map((p) => p.name).join(", ")
                    : "N/A"}
                </p>
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
      </div>
    );
  };

  return isModal ? movieDetailsModalJSX : movieDetailsPageJSX();
};

export default MovieDetails;
