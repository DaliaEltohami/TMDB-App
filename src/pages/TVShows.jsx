import React from "react";
import PopularTVShows from "../components/PopularTVShows";

const TVShows = () => {
  return (
    <>
      <h1 className="font-dm-sans mt-10 flex w-full justify-center text-center text-5xl leading-tight font-bold text-white sm:text-[64px] sm:leading-[76px]">
        <span className="text-gradient">TV Shows</span>
      </h1>
      <PopularTVShows />
    </>
  );
};

export default TVShows;
