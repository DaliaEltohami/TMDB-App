import ReactDOM from "react-dom";
import ratingIcon from "../assets/Rating.svg";

const MovieDetailsModal = ({ open, onClose }) => {
  const renderDetailsModal = () => {
    return (
      <div className="movie-details-modal fixed top-0 z-10 flex h-screen w-screen items-center justify-center text-white">
        <div
          className="overlay bg-primary fixed top-0 left-0 h-full w-full opacity-65"
          onClick={onClose}
        ></div>
        <div className="text-light-100 bg-primary shadow-light-200/50 shadow-modal relative z-1 h-4/5 w-4/5 rounded-2xl p-10">
          <div
            className="text-bold text-light-100 absolute top-1 right-4 cursor-pointer text-right text-3xl"
            onClick={onClose}
          >
            x
          </div>
          <div className="movie-details-modal-header flex justify-between">
            <h2>Heading</h2>
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
