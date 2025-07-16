const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_MOVIES_API_URL = import.meta.env.VITE_TMDB_BASE_URL;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export const fetchAllMovies = async (debouncedPageNumber) => {
  const res = await fetch(
    `${TMDB_MOVIES_API_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=${debouncedPageNumber}`,
    API_OPTIONS,
  );

  return res;
};

export async function fetchLatestMovies(debouncedPageNumber) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const res = await fetch(
    `${TMDB_MOVIES_API_URL}/discover/movie?sort_by=release_date.desc&release_date.lte=${today}&page=${debouncedPageNumber}`,
    API_OPTIONS,
  );
  return res;
}

export async function fetchLatestTVShows(debouncedPageNumber) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const res = await fetch(
    `${TMDB_MOVIES_API_URL}/discover/tv?sort_by=first_air_date.desc&first_air_date.lte=${today}&page=${debouncedPageNumber}`,
    API_OPTIONS,
  );
  return res;
}
