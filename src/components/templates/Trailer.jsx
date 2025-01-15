import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
import NotFound from "../NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(pathname, ytvideo);

  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center ">
      <h1 className="hover:text-cyan-500 text-2xl font-semibold text-white right-[5%] top-[5%]  absolute">
        <RiCloseFill onClick={(e) => navigate(-1)} />
      </h1>{" "}
      {ytvideo ? (
        <ReactPlayer
          height={600}
          width={1200}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
