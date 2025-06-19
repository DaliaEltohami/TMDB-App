const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_MOVIES_API_URL = import.meta.env.VITE_TMDB_BASE_URL;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export const fetchTVShowReleaseDatesDetails = (tvShowId) => {
  // For TV shows, content ratings are under /tv/{tv_id}/content_ratings
  return fetch(
    `${TMDB_MOVIES_API_URL}/tv/${tvShowId}/content_ratings`,
    API_OPTIONS,
  );
};
