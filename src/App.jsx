import movieLogo from "./assets/logo.svg";
import heroImage from "./assets/hero-img.png";
import "./App.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";

function App() {
  return (
    <>
      <div className="bg-pattern-bg absolute z-0 h-screen w-screen bg-cover bg-center">
        <div className="container mx-auto">
          <header className="mt-4 flex flex-col items-center justify-center px-4 py-3 shadow md:mt-6 md:px-6 md:py-4 lg:px-8 lg:py-5">
            <div class="flex items-center">
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
          <main className="mt-10 flex flex-col gap-5 sm:mt-15">
            <h2 className="font-dm-sans text-3xl leading-8 font-bold text-white">
              Popular Movies
            </h2>
            <div className="popular-movies grid h-200 grid-cols-4">
              <MovieCard />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
