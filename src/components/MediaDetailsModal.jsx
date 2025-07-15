import ReactDOM from "react-dom";
import ratingIcon from "../assets/Rating.svg";
import noPoster from "../assets/no-media.png";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import useMediaDetails from "../hooks/useMediaDetails";

const MediaDetailsModal = () => {
  const params = useParams();
  const mediaType = params["media-type"] || "movie";

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const { media, loading, error } = useMediaDetails(mediaType, params.id);

  console.log(media, "media in MediaDetailsModal");

  const poster = media.posterPath
    ? `https://image.tmdb.org/t/p/w500${media.posterPath}`
    : noPoster;

  const genres = media.genres ? media.genres.map((g) => g.name).join(", ") : "";
  const countries = media.production_countries
    ? media.production_countries.map((c) => c.name).join(", ")
    : "";
  const languages = media.spoken_languages
    ? media.spoken_languages.map((l) => l.english_name).join(", ")
    : "";
  const companies = media.production_companies
    ? media.production_companies.map((c) => c.name).join(", ")
    : "";

  const year = media.date ? media.date.slice(0, 4) : "";
  const cert = media.cert || "";

  const hours = media.runtime ? Math.floor(media.runtime / 60) : "";
  const minutes = media.runtime ? media.runtime % 60 : "";

  const rating = media.voteAverage
    ? Math.floor(media.voteAverage * 10) / 10
    : "";

  const handleClose = () => {
    if (backgroundLocation) {
      navigate(-1); // Go back to previous location
    } else {
      navigate("/"); // Fallback if opened directly
    }
  };

  const renderDetailsModal = () => {
    console.log("Rendering Movie Details Modal Loading State", loading);
    return (
      <div className="movie-details-modal fixed top-0 z-10 flex h-screen w-screen items-center justify-center text-white">
        <div
          className="overlay bg-primary fixed top-0 left-0 h-full w-full opacity-65"
          onClick={handleClose}
        ></div>
        <div className="movie-details-modal-content text-light-100 bg-primary shadow-light-200/50 shadow-modal relative z-1 h-4/5 w-4/5 overflow-scroll rounded-2xl p-15 2xl:h-6/7 2xl:w-4/6">
          <div
            className="text-bold text-light-100 absolute top-1 right-4 cursor-pointer text-right text-2xl"
            onClick={handleClose}
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
                  {media.title || media.original_title}
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
                  {cert && " • "}
                </span>
                <span>
                  {cert}
                  {hours || minutes ? " • " : ""}
                </span>
                <span>{Boolean(hours) && `${hours}h `}</span>
                <span>{Boolean(minutes) && `${minutes}min`}</span>
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
                  {media.trailer ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${media.trailer}`}
                      title="Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full object-cover"
                    ></iframe>
                  ) : (
                    <img
                      src={noPoster}
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
                  <p className="flex-4/5 text-white">{media.overview}</p>
                </div>
                <div className="release-date mb-3 flex flex-col md:flex-row">
                  <h5 className="flex-1/5">Release Date: </h5>
                  <p className="flex-4/5 text-white">{media.date}</p>
                </div>
                <div className="status mb-3 flex flex-col md:flex-row">
                  <h5 className="flex-1/5">Status: </h5>
                  <p className="flex-4/5 text-white">{media.status}</p>
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
  };
  return ReactDOM.createPortal(
    renderDetailsModal(),
    document.getElementById("portal"),
  );
};

export default MediaDetailsModal;
