import movieLogo from "./assets/logo.svg";
import heroImage from "./assets/hero-img.png";
import "./App.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import TrendingMovieCard from "./components/TrendingMovieCard";
import MoviePagination from "./components/MoviePagination";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const res = await fetch();
  };

  useEffect(() => {
    const res = fetch();

    return () => {
      second;
    };
  }, [third]);

  return (
    <>
      <div className="bg-pattern-bg absolute top-0 z-0 h-screen w-screen bg-cover bg-center"></div>
      <div className="relative z-10 container mx-auto">
        <header className="mt-4 flex flex-col items-center justify-center px-4 py-3 shadow md:mt-6 md:px-6 md:py-4 lg:px-8 lg:py-5">
          <div className="flex items-center">
            <img src={movieLogo} alt="Logo" className="h-8 md:h-10" />
          </div>

          <div className="flex items-center">
            <img src={heroImage} alt="Hero Image" className="h-50 md:h-100" />
          </div>
          <h1 className="font-dm-sans max-w-4xl text-center text-5xl leading-tight font-bold text-white sm:text-[64px] sm:leading-[76px]">
            Find <span className="text-gradient">Movies</span> You’ll Love
            Without the Hassle
          </h1>
          <Search />
        </header>
        <main className="mt-10 flex flex-col gap-7 px-8 sm:mt-15">
          <div className="trendings mt-10 flex flex-col gap-10 p-8 sm:mt-15">
            <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
              Trending Movies
            </h2>
            <div className="trending-movies grid grid-cols-1 justify-items-center gap-5 md:grid-cols-3 md:justify-items-start 2xl:grid-cols-6">
              <TrendingMovieCard />
              <TrendingMovieCard />
              <TrendingMovieCard />
              <TrendingMovieCard />
              <TrendingMovieCard />
              <TrendingMovieCard />
            </div>
          </div>
          <div className="popular mt-10 flex flex-col gap-10 p-8 sm:mt-15">
            <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
              Popular Movies
            </h2>
            <div className="popular-movies grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <MovieCard title="Sonic 3" />
              <MovieCard title="Sonic 3 Sonic 3 Sonic 3 Sonic 3" />
              <MovieCard title="Sonic 3" />
              <MovieCard title="Sonic 3" />
              <MovieCard title="Sonic 3" />
              <MovieCard title="Sonic 3" />
            </div>
          </div>
          <div className="pagination p-8">
            <MoviePagination />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
