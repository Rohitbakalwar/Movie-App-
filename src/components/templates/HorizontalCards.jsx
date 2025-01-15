import React from "react";
import { Link } from "react-router-dom";
const noImage = "/noimages.png";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full flex overflow-y-hidden p-5">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link
            to={`/${item.media_type}/details/${item.id}`}
            className="min-w-[15%] h-[35vh]  bg-zinc-900 mr-5"
            key={index}
          >
            <img
              className="object-cover w-full h-[45%]"
              src={
                item.backdrop_path || item.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      item.backdrop_path || item.profile_path
                    }`
                  : noImage
              }
              alt={
                item.name ||
                item.title ||
                item.original_title ||
                "Movie/Show Image"
              }
            />
            <div className="text-white p-3 h-[55%] overflow-y-auto">
              <h1 className="text-white text-xl font-semibold">
                {item.name ||
                  item.title ||
                  item.original_title ||
                  item.original_name ||
                  "No Title"}
              </h1>
              <p className="text-white text-sm mt-2 mb-3">
                {item.overview
                  ? `${item.overview.slice(0, 50)}...`
                  : "No description available."}
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
