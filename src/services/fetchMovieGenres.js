const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_MOVIES_API_URL = import.meta.env.VITE_TMDB_BASE_URL;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export const fetchMovieGenres = async () => {
  const res = await fetch(
    `${TMDB_MOVIES_API_URL}/genre/movie/list?language=en`,
    API_OPTIONS,
  );

  return res;
};
