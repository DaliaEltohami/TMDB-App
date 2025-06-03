import ReactDOM from "react-dom";
import ratingIcon from "../assets/Rating.svg";
import poster from "../assets/sonic3.jpg";

const MovieDetailsModal = ({ open, onClose }) => {
  const renderDetailsModal = () => {
    return (
      <div className="movie-details-modal fixed top-0 z-10 flex h-screen w-screen items-center justify-center text-white">
        <div
          className="overlay bg-primary fixed top-0 left-0 h-full w-full opacity-65"
          onClick={onClose}
        ></div>
        <div className="movie-details-modal-content text-light-100 bg-primary shadow-light-200/50 shadow-modal relative z-1 h-4/5 w-4/5 overflow-scroll rounded-2xl p-15 2xl:w-3/4">
          <div
            className="text-bold text-light-100 absolute top-1 right-4 cursor-pointer text-right text-2xl"
            onClick={onClose}
          >
            x
          </div>
          <div className="movie-details-modal-header mb-2 flex justify-between">
            <h2 className="text-4xl font-bold text-white">Heading</h2>
            <div className="bg-dark-100 flex items-center justify-between gap-2 rounded-2xl px-5 py-2">
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
          <div className="movie-details-modal-details">
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
  return open
    ? ReactDOM.createPortal(
        renderDetailsModal(),
        document.getElementById("portal"),
      )
    : null;
};

export default MovieDetailsModal;
