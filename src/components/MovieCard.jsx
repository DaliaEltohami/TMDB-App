// import ratingIcon from "../assets/Rating.svg";
// import moviePic from "../assets/sonic3.jpg";

// const MovieCard = () => {
//   return (
//     <div className="bg-dark-100 flex h-96 flex-col gap-3 overflow-hidden rounded-2xl px-5 py-4 text-white">
//       <div className="flex-grow overflow-hidden rounded-2xl">
//         <img
//           src={moviePic}
//           alt="sonic3 image"
//           className="h-full w-full object-cover"
//         />
//       </div>
//       <div className="flex flex-col gap-2">
//         <h3 className="text-lg font-bold">Sonic 3</h3>
//         <div className="flex items-center gap-2">
//           <span className="rating-icon">
//             <img src={ratingIcon} alt="rating icon" className="h-5 w-5" />
//           </span>
//           <span className="font-bold">4.5</span>
//           <span className="text-gray-400">• Action • Movie</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

import ratingIcon from "../assets/Rating.svg";
import moviePic from "../assets/sonic3.jpg";

const MovieCard = ({ title }) => {
  return (
    <div className="movie-card bg-dark-100 flex flex-col gap-2 overflow-hidden rounded-2xl px-4 py-3 text-white">
      <div className="movie-img h-60 overflow-hidden rounded-2xl">
        <img
          src={moviePic}
          alt="sonic3 image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="movie-content flex flex-col justify-end gap-3">
        <h3 className="text-[16px] font-bold">{title}</h3>
        <div className="movie-details flex items-center gap-2">
          <span className="rating-icon">
            <img src={ratingIcon} alt="rating icon" />
          </span>
          <span className="rating font-bold">4.5</span>
          <span className="movie-category text-gray-100">• Action • Movie</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
