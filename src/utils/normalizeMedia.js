export function normalizeMediaItem(item) {
  const isMovie = item.media_type === "movie" || !!item.title;

  console.log("item in normalized data", item);
  console.log("isMovie in normalized data", isMovie);

  return {
    id: item.id,
    title: isMovie ? item.title : item.name,
    date: isMovie ? item.release_date : item.first_air_date,
    posterPath: item.poster_path,
    overview: item.overview,
    mediaType: isMovie ? "movie" : "tv",
    voteAverage: item.vote_average ?? 0,
    runtime: isMovie ? item.runtime : item.episode_run_time?.[0] || "",
    genres: item.genres || [], // fallback to empty array
    ...item,
  };
}
