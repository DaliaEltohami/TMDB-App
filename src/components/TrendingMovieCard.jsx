import trendingThumb from "../assets/sonic3.jpg";

const TrendingMovieCard = () => {
  return (
    <div className="trending-movie-card relative flex h-[145px] items-center justify-center overflow-hidden rounded-lg md:justify-start">
      <h4 className="number fancy-text absolute z-5 font-black">5</h4>
      <div className="trending-thumb relative left-14 z-7 h-[140px] overflow-hidden rounded-lg">
        <img
          src={trendingThumb}
          alt="trending thumb "
          className="h-full w-full object-cover object-center"
        />
      </div>
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
