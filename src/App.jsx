import "./App.css";
import { Outlet, Route, Routes, useLocation } from "react-router";
import MovieDetailsModal from "./components/MovieDetailsModal.jsx";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  console.log("location in App", location);
  console.log("backgroundLocation in App", backgroundLocation);

  return (
    <>
      <Navbar />
      {/* Main Routes */}
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
      </Routes>

      {/* Modal Routes - only render if we have a background location */}
      {backgroundLocation && (
        <Routes>
          <Route path="/movie-details/:id" element={<MovieDetailsModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
//const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.asc';
