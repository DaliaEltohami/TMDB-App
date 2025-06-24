import ratingIcon from "../assets/Rating.svg";
import noPoster from "../assets/no-media.png";
import { useLocation, useNavigate } from "react-router";
import { normalizeMediaItem } from "../utils/normalizeMedia";

const MediaCard = ({ media }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const normalizedMedia = normalizeMediaItem(media);

  const handleMediaNavigation = () => {
    // normalizedMedia.mediaType === "movie"
    //   ? navigate(`/movie-details/${media.id}`, {
    //       state: {
    //         backgroundLocation: location,
    //         mediaType: normalizedMedia.mediaType,
    //       },
    //     })
    //   : navigate(`/tvshow-details/${media.id}`, {
    //       state: {
    //         backgroundLocation: location,
    //         mediaType: normalizedMedia.mediaType,
    //       },
    //     });

    navigate(`/media-details/${media.id}`, {
      state: {
        backgroundLocation: location,
        mediaType: normalizedMedia.mediaType,
      },
    });
  };
  return (
    <div
      className="media-card bg-dark-100 flex h-full min-h-[400px] flex-col gap-4 overflow-hidden rounded-2xl p-5 text-white"
      onClick={handleMediaNavigation}
    >
      <div
        className="media-img h-60 cursor-pointer overflow-hidden rounded-2xl transition-all duration-200 ease-in-out hover:scale-105"
        // onClick={() => setIsOpen(true)}
      >
        <img
          src={
            normalizedMedia.posterPath
              ? `https://image.tmdb.org/t/p/w500${normalizedMedia.posterPath}`
              : noPoster
          }
          alt="media poster"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="media-content flex flex-col justify-start gap-3">
        <div className="flex flex-1 items-center justify-between">
          <h3 className="line-clamp-1 flex-2 overflow-hidden text-base font-bold">
            {normalizedMedia.title || normalizedMedia.name}
          </h3>

          <span className="ml-1 flex-1 text-end text-[8px] text-gray-100">
            {normalizedMedia.date}
          </span>
        </div>
        <span className="media-category text-[14px] text-gray-100 capitalize">
          {normalizedMedia.mediaType}
        </span>
        <div className="media-details flex flex-1 flex-wrap content-start items-start gap-2">
          <span className="rating-icon">
            <img src={ratingIcon} alt="rating icon" />
          </span>
          <span className="rating font-bold">
            {Math.floor(normalizedMedia.voteAverage * 10) / 10}
          </span>
          {normalizedMedia.genres.map((genre) => (
            <span key={genre?.id} className="genre text-[14px] text-gray-100">
              {genre?.name} •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
