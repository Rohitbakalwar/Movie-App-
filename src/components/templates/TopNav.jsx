import React, { useEffect } from "react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
const noImage = "/noimages.png";

const TopNav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const GetSearch = async () => {
    try {
      const data = await axios.get(`/search/multi?query=${query}`);
      // console.log(data);
      setsearches(data.data.results);
      // console.log("search", searches);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetSearch();
  }, [query]);

  return (
    <div className=" relative flex items-center justify-start ml-[15%]">
      <IoSearch className="text-zinc-200 text-3xl" aria-label="Search icon" />
      <input
        value={query}
        onChange={(e) => setquery(e.target.value)}
        type="text"
        placeholder="Search here..."
        className=" mx-5 p-3 bg-transparent w-[50%] text-zinc-200 border-b border-zinc-200 outline-none placeholder:capitalize text-lg "
      />
      {query.length > 0 && (
        <IoMdClose
          onClick={() => setquery("")}
          className="text-zinc-200 text-3xl"
          aria-label="Close icon"
        />
      )}

      {/* Dropdown Container */}
      {query.length > 0 && (
        <div className="absolute z-10 w-[50%] max-h-[50vh] bg-zinc-200  top-[110%]  shadow-lg  overflow-auto ml-12 custom-scrollbar">
          {searches.map((s, i) => (
            <Link 
              key={i}
              to={`/${s.media_type}/details/${s.id}`}
              className="flex items-center p-4 bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-lg shadow-sm mt-1 border-zinc-100 border-b-2 text-gray-800 hover:text-black  font-semibold duration-300"
            >
              <img
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noImage
                }
                alt=""
                className="w-20 h-20 mr-4  object-cover rounded shadow-md"
              />
              <span>{s.name || s.title || s.original || s.original.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;
