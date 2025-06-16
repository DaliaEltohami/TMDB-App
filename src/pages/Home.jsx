import "../App.jsx";
import TrendingMovies from "../components/TrendingMovies.jsx";
import Header from "../components/Header.jsx";
import PopularMovies from "../components/PopularMovies.jsx";
import Trendings from "../components/Trendings.jsx";

function Home() {
  return (
    <>
      <div className="bg-pattern-bg absolute top-0 h-screen w-screen bg-cover bg-center"></div>
      <div className="relative container mx-auto">
        <Header />
        <main className="mt-10 flex flex-col gap-7 px-8 sm:mt-15">
          {/* <TrendingMovies /> */}
          <Trendings />
          {/* <PopularMovies /> */}
        </main>
      </div>
    </>
  );
}

export default Home;

//const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.asc';
