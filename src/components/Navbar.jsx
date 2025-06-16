import { Link } from "react-router";
import movieLogo from "../assets/logo.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="navbar relative z-2 flex items-center justify-between bg-transparent px-6 py-4 text-white">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={movieLogo} alt="Logo" className="h-6 md:h-8" />
          <span className="ml-2 text-xl font-bold">Movie App</span>
        </Link>
      </div>
      <div className="md:hidden">
        <RxHamburgerMenu
          className="cursor-pointer text-3xl transition-transform duration-200 hover:scale-110 active:bg-gray-700"
          onClick={handleBurgerClick}
        />
        <div
          className={`absolute top-14 right-2 z-20 w-56 rounded-xl bg-gradient-to-br from-gray-900/95 to-gray-800/90 p-5 shadow-2xl ring-1 ring-gray-700 backdrop-blur-md transition-all duration-200 ${
            menuOpen
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-lg font-medium transition-colors duration-150 hover:bg-gray-700/70 hover:text-yellow-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-lg font-medium transition-colors duration-150 hover:bg-gray-700/70 hover:text-yellow-400"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/tv-shows"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-lg font-medium transition-colors duration-150 hover:bg-gray-700/70 hover:text-yellow-400"
              >
                TV Shows
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden md:block">
        <ul className="text-semi-bold flex items-center gap-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/tv-shows">TV Shows</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
