import ratingIcon from "../assets/Rating.svg";
import { Link, useParams } from "react-router";
import noPoster from "../assets/no-media.png";
import { BeatLoader } from "react-spinners";
import { FaArrowRightLong } from "react-icons/fa6";
import useMediaDetails from "../hooks/useMediaDetails";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

const MediaDetails = () => {
  const params = useParams();
  const mediaType = params["media-type"] || "movie";

  const { media, loading, error } = useMediaDetails(mediaType, params.id);

  const poster = media.posterPath
    ? `https://image.tmdb.org/t/p/w500${media.posterPath}`
    : noPoster;

  const countries = media.production_countries
    ? media.production_countries.map((c) => c.name).join(", ")
    : "N/A";
  const languages = media.spoken_languages
    ? media.spoken_languages.map((l) => l.english_name).join(", ")
    : "N/A";
  const companies = media.production_companies
    ? media.production_companies.map((c) => c.name).join(", ")
    : "N/A";

  const hours = media.runtime ? Math.floor(media.runtime / 60) : "";
  const minutes = media.runtime ? media.runtime % 60 : "";

  const rating = media.voteAverage
    ? Math.floor(media.voteAverage * 10) / 10
    : "";

  const renderMedia = () => {
    console.log("Media Details:", media);
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
              {media.title}
            </h2>
            <div className="bg-dark-100 flex items-center justify-between gap-2 px-5 py-2 md:rounded-2xl">
              <span className="rating-icon">
                <img src={ratingIcon} alt="rating icon" />
              </span>
              <span className="rating font-bold text-white">
                {Math.floor(rating * 10) / 10}
              </span>
              <span>/ 10</span>
            </div>
          </div>
          <div className="movie-details-modal-sub-heading mb-5">
            <span>
              {media.date} {media.cert && "• "}
            </span>
            <span>
              {media.cert} {hours || minutes ? "• " : ""}
            </span>
            <span>{hours !== 0 && `${hours}h `}</span>
            <span>{minutes !== 0 && `${minutes}min`}</span>
          </div>
          <div className="movie-details-modal-images mb-5 flex w-full flex-col justify-between gap-10 gap-y-2.5 md:h-[400px] md:flex-row">
            <div className="movie-details-modal-poster h-[250px] w-full overflow-hidden rounded-2xl md:h-full md:w-1/5">
              <img
                src={poster}
                alt="movie poster"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="movie-details-modal-trailer-poster h-[150px] overflow-hidden rounded-2xl md:h-full md:w-4/5">
              {media.trailer ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${media.trailer}`}
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
            </div>
          </div>
          <div className="details-container flex flex-col justify-between md:flex-row">
            <div className="movie-details-modal-details p-2 md:w-4/6">
              <div className="genres mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Genres: </h5>
                <p className="flex-4/5 text-white">
                  {media.genres && media.genres.length > 0 ? (
                    media.genres.map((g) => (
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
                <p className="flex-4/5 text-white">{media.overview || "N/A"}</p>
              </div>
              <div className="release-date mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Release Date: </h5>
                <p className="flex-4/5 text-white">{media.date || "N/A"}</p>
              </div>
              <div className="status mb-3 flex flex-col md:flex-row">
                <h5 className="flex-1/5">Status: </h5>
                <p className="flex-4/5 text-white">{media.status || "N/A"}</p>
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

  return renderMedia();
};

export default MediaDetails;
