import { useEffect, useState } from "react";
import { fetchTVShowDetails } from "../services/fetchTVShowDetails";
import { fetchTVShowReleaseDatesDetails } from "../services/fetchTVShowReleaseDatesDetails";
import { fetchTVShowVideos } from "../services/fetchTVShowVideos";

const useTVShowDetails = (tvShowId) => {
  const [tvShow, setTVShow] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCertFromReleaseDates = async (releaseDatesRes) => {
    try {
      if (releaseDatesRes.status === "fulfilled" && releaseDatesRes.value.ok) {
        const releaseDates = await releaseDatesRes.value.json();
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

  const getTrailerFromVideos = async (videosRes) => {
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

  const getTVShowDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const [tvShowDetailsRes, tvShowReleaseDatesRes, tvShowVideosRes] =
        await Promise.allSettled([
          fetchTVShowDetails(tvShowId),
          fetchTVShowReleaseDatesDetails(tvShowId),
          fetchTVShowVideos(tvShowId),
        ]);

      if (
        tvShowDetailsRes.status !== "fulfilled" ||
        !tvShowDetailsRes.value.ok
      ) {
        setError("Error Getting TV Show Details");
        throw new Error("Response is not ok");
      }
      const tvShowDetails = await tvShowDetailsRes.value.json();

      const cert = await getCertFromReleaseDates(tvShowReleaseDatesRes);
      const trailer = await getTrailerFromVideos(tvShowVideosRes);

      setTVShow({ ...tvShowDetails, cert, trailer });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tvShowId) {
      getTVShowDetails();
    }
  }, [tvShowId]);

  return { tvShow, loading, error };
};

export default useTVShowDetails;
