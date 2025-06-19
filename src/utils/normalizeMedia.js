export function normalizeMediaItem(item) {
  const isMovie = item.media_type === "movie" || !!item.title;

  return {
    id: item.id,
    title: isMovie ? item.title : item.name,
    date: isMovie ? item.release_date : item.first_air_date,
    posterPath: item.poster_path,
    overview: item.overview,
    mediaType: item.media_type === "movie" ? "movie" : "TV show",
    voteAverage: item.vote_average ?? 0,
    genres: item.genres || [], // fallback to empty array
  };
}
