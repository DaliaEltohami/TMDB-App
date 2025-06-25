import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/fetchMovieDetails";
import { fetchMovieReleaseDatesDetails } from "../services/fetchMovieReleaseDatesDetails";
import { fetchMovieVideos } from "../services/fetchMovieVideos";
import { fetchTVShowDetails } from "../services/fetchTVShowDetails";
import { fetchTVShowReleaseDatesDetails } from "../services/fetchTVShowReleaseDatesDetails";
import { fetchTVShowVideos } from "../services/fetchTVShowVideos";
import { normalizeMediaItem } from "../utils/normalizeMedia";

const useMediaDetails = (mediaType, mediaId) => {
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getMovieDetails = async () => {
    try {
      const [movieDetailsRes, movieReleaseDatesRes, movieVideosRes] =
        await Promise.allSettled([
          fetchMovieDetails(mediaId),
          fetchMovieReleaseDatesDetails(mediaId),
          fetchMovieVideos(mediaId),
        ]);

      if (movieDetailsRes.status !== "fulfilled" || !movieDetailsRes.value.ok) {
        setError("Error Getting Movie Details");
        throw new Error("Response is not ok");
      }
      let movieDetails = await movieDetailsRes.value.json();

      movieDetails = normalizeMediaItem(movieDetails);

      const cert = await getMovieCertFromReleaseDates(movieReleaseDatesRes);
      const trailer = await getMovieTrailerFromVideos(movieVideosRes);

      setMedia({ ...movieDetails, cert, trailer });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getMovieCertFromReleaseDates = async (movieReleaseDatesRes) => {
    try {
      if (
        movieReleaseDatesRes.status === "fulfilled" &&
        movieReleaseDatesRes.value.ok
      ) {
        const releaseDates = await movieReleaseDatesRes.value.json();
        console.log("MovieRelease Dates:", releaseDates);

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

  const getMovieTrailerFromVideos = async (movieVideosRes) => {
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

  const getTVShowDetails = async () => {
    try {
      const [tvShowDetailsRes, tvShowReleaseDatesRes, tvShowVideosRes] =
        await Promise.allSettled([
          fetchTVShowDetails(mediaId),
          fetchTVShowReleaseDatesDetails(mediaId),
          fetchTVShowVideos(mediaId),
        ]);

      if (
        tvShowDetailsRes.status !== "fulfilled" ||
        !tvShowDetailsRes.value.ok
      ) {
        setError("Error Getting TV Show Details");
        throw new Error("Response is not ok");
      }
      let tvShowDetails = await tvShowDetailsRes.value.json();

      tvShowDetails = normalizeMediaItem(tvShowDetails);

      const cert = await getTVShowCertFromReleaseDates(tvShowReleaseDatesRes);
      const trailer = await getTVShowTrailerFromVideos(tvShowVideosRes);

      setMedia({ ...tvShowDetails, cert, trailer });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTVShowTrailerFromVideos = async (videosRes) => {
    try {
      if (videosRes.status === "fulfilled" && videosRes.value.ok) {
        const videos = await videosRes.value.json();
        console.log("Videos Response:", videos);
        const trailer = videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );
        console.log("Trailer Found:", trailer);
        return trailer ? trailer.key : "";
      }
      throw new Error("Videos response not fulfilled or not ok");
    } catch (error) {
      console.log(error.message);
      return "";
    }
  };

  const getTVShowCertFromReleaseDates = async (releaseDatesRes) => {
    try {
      if (releaseDatesRes.status === "fulfilled" && releaseDatesRes.value.ok) {
        const contentRatings = await releaseDatesRes.value.json();
        // Try US rating first
        let ratingEntry = contentRatings.results.find(
          (r) => r.iso_3166_1 === "US" && r.rating,
        );
        // Fallback: first available rating with a value
        if (!ratingEntry) {
          ratingEntry = contentRatings.results.find((r) => r.rating);
        }
        return ratingEntry ? ratingEntry.rating : "";
      }
      throw new Error("Content ratings response not fulfilled or not ok");
    } catch (error) {
      console.error("Error fetching TV show content rating:", error.message);
      return "";
    }
  };

  const getMediaDetails = async () => {
    setLoading(true);
    setError("");
    if (!mediaId || !mediaType) {
      setLoading(false);
      setError("Invalid media type or ID");
      return;
    }
    if (mediaType === "movie") {
      getMovieDetails();
    } else {
      getTVShowDetails();
    }
  };

  useEffect(() => {
    getMediaDetails();
  }, [mediaId, mediaType]);

  return { media, loading, error };
};

export default useMediaDetails;
