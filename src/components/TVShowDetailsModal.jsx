import ReactDOM from "react-dom";
import ratingIcon from "../assets/Rating.svg";
import noPoster from "../assets/no-media.png";
import { useLocation, useNavigate, useParams } from "react-router";
import useTVShowDetails from "../hooks/useTVShowDetails";

const TVShowDetailsModal = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { tvShow, loading, error } = useTVShowDetails(params.id);

  console.log("TV Show Details Modal - TV Show Data:", tvShow);

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const poster = tvShow.poster_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
    : noPoster;

  const genres = tvShow.genres
    ? tvShow.genres.map((g) => g.name).join(", ")
    : "";
  const countries = tvShow.production_countries
    ? tvShow.production_countries.map((c) => c.name).join(", ")
    : "";
  const languages = tvShow.spoken_languages
    ? tvShow.spoken_languages.map((l) => l.english_name).join(", ")
    : "";
  const companies = tvShow.production_companies
    ? tvShow.production_companies.map((c) => c.name).join(", ")
    : "";

  const year = tvShow.release_date ? tvShow.release_date.slice(0, 4) : "";
  const cert = tvShow.cert || "";
  const runtime = tvShow.runtime
    ? `${Math.floor(tvShow.runtime / 60)}h ${tvShow.runtime % 60}min`
    : "";

  const rating = tvShow.vote_average
    ? Math.floor(tvShow.vote_average * 10) / 10
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
                  {tvShow.title || tvShow.original_title}
                </h2>
                <div className="bg-dark-100 flex items-center justify-between gap-2 px-5 py-2 md:rounded-2xl">
                  <span className="rating-icon">
                    <img src={ratingIcon} alt="rating icon" />
                  </span>
                  <span className="rating font-bold text-white">{rating}</span>
                  <span>/ 10</span>
                </div>
              </div>
              <div className="movie-details-modal-meta text-light-200 mb-4 flex flex-wrap items-center gap-4 text-lg">
                <span>{year}</span>
                {cert && (
                  <span className="bg-dark-200 rounded px-2 py-1">{cert}</span>
                )}
                <span>{runtime}</span>
                {genres && (
                  <span className="text-light-300 italic">{genres}</span>
                )}
              </div>
              <div className="movie-details-modal-main mb-6 flex flex-col gap-6 md:flex-row">
                <div className="movie-details-modal-poster h-[320px] w-full flex-shrink-0 overflow-hidden rounded-2xl shadow-lg md:w-1/3">
                  <img
                    src={poster}
                    alt="movie poster"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="movie-details-modal-overview flex flex-1 flex-col gap-4">
                  <div>
                    <h5 className="text-light-100 mb-1 text-lg font-semibold">
                      Overview
                    </h5>
                    <p className="text-white">{tvShow.overview}</p>
                  </div>
                  <div>
                    <h5 className="text-light-100 mb-1 text-lg font-semibold">
                      Key Details
                    </h5>
                    <ul className="space-y-1 text-white">
                      <li>
                        <span className="font-semibold">Release Date:</span>{" "}
                        {tvShow.release_date}
                      </li>
                      <li>
                        <span className="font-semibold">Status:</span>{" "}
                        {tvShow.status}
                      </li>
                      {countries && (
                        <li>
                          <span className="font-semibold">Countries:</span>{" "}
                          {countries}
                        </li>
                      )}
                      {languages && (
                        <li>
                          <span className="font-semibold">Languages:</span>{" "}
                          {languages}
                        </li>
                      )}
                      {companies && (
                        <li>
                          <span className="font-semibold">
                            Production Companies:
                          </span>{" "}
                          {companies}
                        </li>
                      )}
                    </ul>
                  </div>
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

export default TVShowDetailsModal;
