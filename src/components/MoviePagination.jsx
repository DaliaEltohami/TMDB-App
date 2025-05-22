import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const maxPageNumber = 500;

const MoviePagination = ({ debouncedPageNumber, setDebouncePageNumber }) => {
  const [pageNumber, setPageNumber] = useState(debouncedPageNumber);

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
      if (
        Number.isInteger(pageNumber) &&
        pageNumber >= 1 &&
        pageNumber <= maxPageNumber
      ) {
        setDebouncePageNumber(pageNumber);
      }
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
            type="number"
            min={0}
            max={500}
            onChange={(e) => {
              if (
                Number.isInteger(Number(e.target.value)) &&
                e.target.value >= 1 &&
                e.target.value <= maxPageNumber
              ) {
                updatePageNumber(Number(e.target.value));
              } else {
                alert("please enter valid number");
              }
            }}
            value={pageNumber ?? 1}
            className="w-12"
          />
        </span>
        <span className="mx-1"> / </span>
        <span> {maxPageNumber}</span>
      </div>
      <button
        onClick={increamentPageNumber}
        disabled={pageNumber >= maxPageNumber}
        className="after bg-dark-100 flex cursor-pointer items-center justify-center rounded-xl p-5 text-white disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default MoviePagination;
