import "./App.css";
import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import MediaDetailsModal from "./components/MediaDetailsModal.jsx";
import MediaDetails from "./pages/MediaDetails.jsx";
import Movies from "./pages/Movies.jsx";
import TVShows from "./pages/TVShows.jsx";

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  console.log("location in App", location);
  console.log("backgroundLocation in App", backgroundLocation);

  return (
    <>
      <div className="bg-pattern-bg absolute top-0 -z-10 h-screen w-screen bg-cover bg-center"></div>
      <div className="container mx-auto">
        <Navbar />
        {/* Main Routes */}
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TVShows />} />

          <Route
            path="/media-details/:media-type/:id"
            element={<MediaDetails />}
          />
        </Routes>

        {/* Modal Routes - only render if we have a background location */}
        {backgroundLocation && (
          <Routes>
            <Route
              path="/media-details/:media-type/:id"
              element={<MediaDetailsModal />}
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
//const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.asc';
