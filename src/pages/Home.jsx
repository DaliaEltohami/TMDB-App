import "../App.jsx";
import Header from "../components/Header.jsx";
import Latest from "../components/Latest.jsx";
import PopularMovies from "../components/PopularMovies.jsx";
import Trendings from "../components/Trendings.jsx";
import TrendingSearchMovies from "../components/TrendingSearchMovies.jsx";

function Home() {
  return (
    <>
      <Header />
      <main className="mt-10 flex flex-col gap-7 px-8 sm:mt-15">
        <Latest />
        <Trendings />
        <PopularMovies />
      </main>
    </>
  );
}

export default Home;

//const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.asc';
