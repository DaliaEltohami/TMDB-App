import { useEffect, useState } from "react";
import ratingIcon from "../assets/Rating.svg";

const MovieCard = ({
  id,
  title,
  releaseDate,
  overview,
  rating,
  genres,
  posterPath,
}) => {
  // const [genresList, setGenresList] = useState([]);

  // const fetchGenres = async () => {
  //   try {
  //     const res = await fetch(
  //       `${import.meta.env.VITE_TMDB_MOVIES_BASE_URL}/movie/${id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  //         },
  //       },
  //     );
  //     const data = await res.json();
  //     setGenresList(data.genres);
  //   } catch (error) {
  //     console.error("Error fetching genres:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchGenres();
  // }, [id]);

  return (
    <div className="movie-card bg-dark-100 flex flex-col gap-4 overflow-hidden rounded-2xl p-5 text-white">
      <div className="movie-img h-60 overflow-hidden rounded-2xl">
        <img
          src={posterPath}
          alt="movie poster"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="movie-content flex flex-grow flex-col gap-3">
        <div className="flex flex-1 items-start justify-between">
          <h3 className="flex-2 text-[16px] font-bold">{title}</h3>
          <span className="ml-1 flex-1 text-end text-[8px] text-gray-100">
            {releaseDate}
          </span>
        </div>
        <div className="movie-details flex flex-1 flex-wrap items-center gap-2">
          <span className="rating-icon">
            <img src={ratingIcon} alt="rating icon" />
          </span>
          <span className="rating font-bold">
            {Math.floor(rating * 10) / 10}
          </span>
          {genres.map((genre) => (
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
  );
};

export default MovieCard;
