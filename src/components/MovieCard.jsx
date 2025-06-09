import { useState } from "react";
import ratingIcon from "../assets/Rating.svg";
import MovieDetailsModal from "./MovieDetailsModal";
import noPoster from "../assets/no-movie.png";
import { Link } from "react-router";

const MovieCard = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="movie-card bg-dark-100 flex h-full min-h-[400px] flex-col gap-4 overflow-hidden rounded-2xl p-5 text-white">
        <div
          className="movie-img h-60 cursor-pointer overflow-hidden rounded-2xl transition-all duration-200 ease-in-out hover:scale-105"
          onClick={() => setIsOpen(true)}
        >
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
        <div className="movie-content flex flex-col justify-start gap-3">
          <div className="flex flex-1 items-end justify-between">
            <h3 className="line-clamp-1 flex-2 overflow-hidden text-base font-bold">
              <Link to={`/movie-details/${movie.id}`}>{movie.title}</Link>
            </h3>
            <span className="ml-1 flex-1 text-end text-[8px] text-gray-100">
              {movie.releaseDate}
            </span>
          </div>
          <div className="movie-details flex flex-1 flex-wrap content-start items-start gap-2">
            <span className="rating-icon">
              <img src={ratingIcon} alt="rating icon" />
            </span>
            <span className="rating font-bold">
              {Math.floor(movie.vote_average * 10) / 10}
            </span>
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre text-[14px] text-gray-100">
                {genre.name} •
              </span>
            ))}
            <span className="movie-category text-[14px] text-gray-100">
              Movie
            </span>
          </div>
        </div>
      </div>
      <MovieDetailsModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default MovieCard;
