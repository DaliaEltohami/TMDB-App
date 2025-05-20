import trendingThumb from "../assets/sonic3.jpg";

const TrendingMovieCard = () => {
  return (
    <div className="trending-movie-card flex h-[145px] w-52 items-center justify-center overflow-hidden rounded-lg md:justify-start">
      <h4 className="number fancy-text relative z-1 font-black">5</h4>
      <img
        src={trendingThumb}
        alt="trending thumb "
        className="relative -left-3 z-2 h-full w-full rounded-lg object-cover object-center"
      />
    </div>

    // <div className="trending-movie-card relative h-60 w-50 overflow-hidden rounded-lg">
    //   <h3 className="absolute left-2 border-2 border-purple-400 leading-16 font-black text-transparent">
    //     1
    //   </h3>
    //   <img
    //     src={trendingThumb}
    //     alt="Trending Movie Thumb"
    //     className="h-full w-full rounded-lg"
    //   />
    // </div>
  );
};

export default TrendingMovieCard;
