import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const maxPageNumbers = 500;

const MoviePagination = ({ debouncePageNumber, setDebouncePagenumber }) => {
  const [pageNumber, setPageNumber] = useState(debouncePageNumber);

  const increamentPageNumber = () => {
    setPageNumber((prev) => prev + 1);
  };
  const decrementPageNumber = () => {
    setPageNumber((prev) => prev - 1);
  };
  const updatePageNumber = (val) => {
    setPageNumber(val);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncePagenumber(pageNumber);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pageNumber]);

  return (
    <div className="flex items-center justify-between text-white">
      <button
        onClick={decrementPageNumber}
        disabled={pageNumber <= 1}
        className="befor bg-dark-100 flex cursor-pointer items-center justify-center rounded-xl p-5 text-white disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
      >
        <FaArrowLeft />
      </button>
      <div className="page-details flex justify-between">
        <span>
          <input
            type="text"
            onChange={(e) => {
              updatePageNumber(e.target.value);
            }}
            value={pageNumber}
            className="w-12"
          />
        </span>
        <span className="mx-1"> / </span>
        <span> {maxPageNumbers}</span>
      </div>
      <button
        onClick={increamentPageNumber}
        disabled={pageNumber >= maxPageNumbers}
        className="after bg-dark-100 flex cursor-pointer items-center justify-center rounded-xl p-5 text-white disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default MoviePagination;
