import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const MoviePagination = () => {
  return (
    <div className="flex items-center justify-between text-white">
      <button className="befor bg-dark-100 flex cursor-pointer items-center justify-center rounded-xl p-5 text-white">
        <FaArrowLeft />
      </button>
      <div className="page-details">2 / 10</div>
      <button className="after bg-dark-100 flex cursor-pointer items-center justify-center rounded-xl p-5 text-white">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default MoviePagination;
