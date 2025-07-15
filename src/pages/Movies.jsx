import TrendingSearchMovies from "../components/TrendingSearchMovies";
import PopularMovies from "../components/PopularMovies";
import LatestMovies from "../components/LatestMovies";

const Movies = () => {
  return (
    <>
      <h1 className="font-dm-sans mt-10 flex w-full justify-center text-center text-5xl leading-tight font-bold text-white sm:text-[64px] sm:leading-[76px]">
        <span className="text-gradient">Movies</span>
      </h1>
      {/* <TrendingSearchMovies /> */}
      <PopularMovies />
      <LatestMovies />
    </>
  );
};

export default Movies;
