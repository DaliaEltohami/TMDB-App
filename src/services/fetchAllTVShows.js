const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_MOVIES_API_URL = import.meta.env.VITE_TMDB_BASE_URL;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export const fetchAllTVShows = async (debouncedPageNumber) => {
  const res = await fetch(
    `${TMDB_MOVIES_API_URL}/discover/tv?sort_by=popularity.desc&include_adult=false&include_video=false&include_null_first_air_dates=false&page=${debouncedPageNumber}`,
    API_OPTIONS,
  );

  return res;
};
