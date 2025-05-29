import noPoster from "../assets/no-movie.png";

const TrendingMovieCard = ({ movie, index }) => (
  <div className="trending-movie-card flex h-[145px] w-52 items-center justify-center overflow-hidden rounded-lg md:justify-start">
    <h4 className="number fancy-text relative z-1 font-black">{index + 1}</h4>
    <img
      src={movie.movieImageURL ? movie.movieImageURL : noPoster}
      alt="trending thumb "
      className="relative -left-3 z-2 h-full w-full rounded-lg object-cover object-center"
    />
  </div>
);

export default TrendingMovieCard;
