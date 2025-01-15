import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  // console.log(data); 

  return (
    <div className=" flex flex-wrap justify-center items-center w-full pt-5 bg-[#1F1E24]">
      {data.map((card, index) => (
        <Link
          to={`/${card.media_type || title}/details/${card.id}`}
          key={index}
          className=" relative w-[25vh] mr-[5%] mb-[5%] "
        >
          <img
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              card.poster_path || card.backdrop_path || card.profile_path
            }`}
            alt=""
          />
          <h3 className="text-zinc-300 text-xl font-semibold mt-3 ">
            {card.name?.slice(0, 20) ||
              card.title?.slice(0, 20) ||
              card.original_title?.slice(0, 20) ||
              card.original_name?.slice(0, 20)}
          </h3>
          {card.vote_average && (
            <div className="absolute right-[-10%] bottom-[30%] text-white font-semibold text-sm bg-yellow-500 rounded-full w-[5vh] h-[5vh] flex justify-center items-center">
              {(card.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
