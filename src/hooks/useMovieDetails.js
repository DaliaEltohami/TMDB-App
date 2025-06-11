import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/fetchMovieDetails";
import { fetchMovieReleaseDatesDetails } from "../services/fetchMovieReleaseDatesDetails";
import { fetchMovieVideos } from "../services/fetchMovieVideos";

const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCertFromReleaseDates = async (movieReleaseDatesRes) => {
    try {
      if (
        movieReleaseDatesRes.status === "fulfilled" &&
        movieReleaseDatesRes.value.ok
      ) {
        const releaseDates = await movieReleaseDatesRes.value.json();
        const usRelease = releaseDates.results.find(
          (r) => r.iso_3166_1 === "US",
        );
        return (
          usRelease?.release_dates?.find((rd) => rd.certification)
            ?.certification || ""
        );
      }
      throw new Error("Release dates response not fulfilled or not ok");
    } catch (error) {
      console.log(error.message);
      return "";
    }
  };

  const getTrailerFromVideos = async (movieVideosRes) => {
    try {
      if (movieVideosRes.status === "fulfilled" && movieVideosRes.value.ok) {
        const videos = await movieVideosRes.value.json();
        const trailer = videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );
        return trailer ? trailer.key : "";
      }
      throw new Error("Videos response not fulfilled or not ok");
    } catch (error) {
      console.log(error.message);
      return "";
    }
  };

  const getMovieDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const [movieDetailsRes, movieReleaseDatesRes, movieVideosRes] =
        await Promise.allSettled([
          fetchMovieDetails(movieId),
          fetchMovieReleaseDatesDetails(movieId),
          fetchMovieVideos(movieId),
        ]);

      if (movieDetailsRes.status !== "fulfilled" || !movieDetailsRes.value.ok) {
        setError("Error Getting Movie Details");
        throw new Error("Response is not ok");
      }
      const movieDetails = await movieDetailsRes.value.json();

      const cert = await getCertFromReleaseDates(movieReleaseDatesRes);
      const trailer = await getTrailerFromVideos(movieVideosRes);

      setMovie({ ...movieDetails, cert, trailer });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMovieDetails();
    }
  }, [movieId]);

  return { movie, loading, error };
};

export default useMovieDetails;
