import React from "react";
import { MdLiveTv } from "react-icons/md";
import { FaFire, FaMagic, FaTv } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

const SideNav = () => {
  const tags = [
    { name: "trending", icon: <FaFire />, link: "/trending" },
    { name: "popular", icon: <FaMagic />, link: "/popular" },
    { name: "movies", icon: <BiSolidCameraMovie />, link: "/movies" },
    { name: "tv shows", icon: <FaTv />, link: "/tvshows" },
    { name: "people", icon: <FaPeopleGroup />, link: "/people" },
  ];
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 ">
      <h1 className=" flex items-center text-2xl font-bold p-5">
        <MdLiveTv className="text-cyan-500 mr-2" />
        <span className="capitalize text-white ">cinemabox</span>
      </h1>
      <nav>
        <h1 className="capitalize text-white text-xl font-semibold py-3 pl-6">
          new feeds
        </h1>
        <ul>
          {tags.map((tag, index) => (
            <Link to={tag.link} key={index}>
              <li className="text-white items-center flex cursor-pointer hover:bg-cyan-500 rounded-lg duration-300 p-5">
                <span className="mr-2">{tag.icon}</span>
                <h1 className="capitalize">{tag.name}</h1>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <hr className="mt-5" />
      <h1 className="text-white text-xl font-bold capitalize pt-7 pl-5">
        website information
      </h1>
      <Link>
        <li className="flex items-center p-5 text-white cursor-pointer hover:bg-cyan-500 rounded-lg duration-300">
          <span className="mr-2">
            <FaInfoCircle />
          </span>
          <h1 className="capitalize">about CinemaBox</h1>
        </li>
      </Link>

      <Link>
        <li className="flex items-center p-5 text-white cursor-pointer hover:bg-cyan-500 rounded-lg duration-300  ">
          <span className="mr-2">
            <IoCall />
          </span>
          <h1 className="capitalize">contact us</h1>
        </li>
      </Link>
    </div>
  );
};

export default SideNav;
