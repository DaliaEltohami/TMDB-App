import noPoster from "../assets/no-movie.png";

const TrendingMovieCard = ({ movie, index }) => (
  <div className="trending-movie-card flex h-[145px] w-52 items-center justify-center overflow-hidden rounded-lg md:justify-start">
    <h4 className="number fancy-text relative z-1 flex-2/6 overflow-hidden text-right font-black">
      {index + 1}
    </h4>
    <img
      src={movie.movieImageURL ? movie.movieImageURL : noPoster}
      alt="trending thumb "
      className="relative z-2 h-full flex-4/6 rounded-lg object-cover object-center"
    />
  </div>
);

export default TrendingMovieCard;
