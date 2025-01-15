import React from "react";
import { Link } from "react-router-dom";
import { IoIosMegaphone } from "react-icons/io";
import { RiAlbumFill } from "react-icons/ri";
import { FaPlayCircle } from "react-icons/fa";

const Header = ({ data }) => {
  // console.log("dataaaa", data);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[60vh] flex flex-col mt-1 justify-end items-start p-[5%] "
    >
      <h1 className="text-white w-[70%] text-5xl font-black ">
        {data.name || data.title || data.original_title || data.original_name}
      </h1>
      <p className="text-white w-[70%] mt-3 mb-3">
        {data.overview
          ? `${data.overview.slice(0, 200)}...`
          : "No description available."}
        <Link
          to={`${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="text-white capitalize flex items-center justify-between gap-1">
        <IoIosMegaphone className=" text-yellow-500" />
        {data.release_date || "Not Present"}
        <RiAlbumFill className=" text-yellow-500" />
        {data.media_type ? data.media_type.toUpperCase() : "Unknown Type"}
      </p>
      <Link
        to={`${data.media_type}/details/${data.id}/trailer`}
        className="text-white bg-cyan-500 capitalize p-4 mt-4 font-semibold rounded flex items-center gap-1"
      >
        {" "}
        <FaPlayCircle className="text-xl" />
        watch trailer{" "}
      </Link>
    </div>
  );
};

export default Header;
