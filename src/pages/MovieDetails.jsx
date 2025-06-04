import ratingIcon from "../assets/Rating.svg";
import poster from "../assets/sonic3.jpg";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../sevices/fetchMovieDetails";
import { BeatLoader } from "react-spinners";

const rootStyles = getComputedStyle(document.documentElement);
const color = rootStyles.getPropertyValue("--color-light-100").trim();

const MovieDetails = () => {
  const params = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const getMovieDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const movieDetailsRes = await fetchMovieDetails(params.id);
      if (!movieDetailsRes.ok) {
        setError("Error Getting Movie Details");
        throw new Error("Response is not ok");
      }
      const movieDetails = await movieDetailsRes.json();
      console.log(movieDetails);
      setMovie(movieDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [params.id]);

  const renderMovie = () => {
    if (loading) {
      return (
        <div className="flex justify-center">
          <BeatLoader
            color={color}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center">
          <p className="text-light-200 text-3xl font-bold">{error}</p>;
        </div>
      );
    }
    return (
      <div className="movie-details-modal bg-primary flex items-center justify-center text-white">
        <div className="movie-details-modal-content text-light-100 bg-primary shadow-light-200/50 shadow-modal relative my-10 w-8/9 rounded-2xl p-15 2xl:w-3/4">
          <div className="movie-details-modal-header mb-5 flex flex-col items-start gap-2.5 md:mb-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-4xl font-bold text-white">{movie.title}</h2>
            <div className="bg-dark-100 flex items-center justify-between gap-2 px-5 py-2 md:rounded-2xl">
              <span className="rating-icon">
                <img src={ratingIcon} alt="rating icon" />
              </span>
              <span className="rating font-bold text-white">
                {Math.floor(9.58952 * 10) / 10}
              </span>
              <span>/ 10</span>
            </div>
          </div>
          <div className="movie-details-modal-sub-heading mb-5">
            <span>2024 •</span>
            <span>PG-13 •</span>
            <span>2h 24min</span>
          </div>
          <div className="movie-details-modal-images mb-5 flex w-full flex-col gap-5 gap-y-2.5 md:h-80 md:flex-row">
            <div className="movie-details-modal-poster h-[200px] w-full overflow-hidden rounded-2xl md:h-full md:flex-2/6">
              <img
                src={poster}
                alt="movie poster"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="movie-details-modal-trailer-poster h-[150px] overflow-hidden rounded-2xl md:h-full md:flex-4/6">
              <img
                src={poster}
                alt="movie poster"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="movie-details-modal-details p-2">
            <div className="genres mb-3 flex flex-col md:flex-row">
              <h5 className="flex-1/5">Genres: </h5>
              <p className="flex-4/5 text-white">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="overview mb-3 flex flex-col md:flex-row">
              <h5 className="flex-1/5">Overview: </h5>
              <p className="flex-4/5 text-white">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="release-date mb-3 flex flex-col md:flex-row">
              <h5 className="flex-1/5">Release Date: </h5>
              <p className="flex-4/5 text-white">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="status mb-3 flex flex-col md:flex-row">
              <h5 className="flex-1/5">Status: </h5>
              <p className="flex-4/5 text-white">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="countries mb-3 flex flex-col md:flex-row">
              <h5 className="flex-1/5">Countries: </h5>
              <p className="flex-4/5 text-white">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="language mb-3 flex flex-col md:flex-row">
              <h5 className="flex-1/5">Languages: </h5>
              <p className="flex-4/5 text-white">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="production-companies mb-3 flex flex-col md:flex-row">
              <h5 className="flex-1/5">Production Companies: </h5>
              <p className="flex-4/5 text-white">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderMovie();
};

export default MovieDetails;
