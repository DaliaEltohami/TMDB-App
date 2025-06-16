import Search from "./Search";
import heroImage from "../assets/hero-img.png";

const Header = () => {
  return (
    <header className="mt-4 flex flex-col items-center justify-center px-4 py-3 shadow md:mt-6 md:px-6 md:py-4 lg:px-8 lg:py-5">
      <div className="flex items-center">
        <img src={heroImage} alt="Hero Image" className="h-50 md:h-100" />
      </div>
      <h1 className="font-dm-sans max-w-4xl text-center text-5xl leading-tight font-bold text-white sm:text-[64px] sm:leading-[76px]">
        Find <span className="text-gradient">Movies</span> You’ll Love Without
        the Hassle
      </h1>
      <Search />
    </header>
  );
};

export default Header;
