import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { aysncloadperson } from "../store/actions/personActions";
import { removeperson } from "../store/actions/personActions";
import { FaArrowLeft } from "react-icons/fa6";
import Loading from "./Loading";
import { IoEarth } from "react-icons/io5";
const noImage = "/public/noimages.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const personDetails = () => {
  const [catgory, setcatgory] = useState("movie");
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(aysncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-screen px-[10%] h-[200%] bg-[#1F1E24]">
      {/* part 1 navigation */}
      <nav className=" h-[10vh] text-white w-full flex items-center gap-10">
        <h1 className="hover:text-cyan-500 text-2xl  font-semibold text-zinc-200 pt-1 pr-2">
          <FaArrowLeft onClick={(e) => navigate(-1)} />
        </h1>
      </nav>
      {/* Part 2 left Poster and Details */}
      <div className="w-full flex ">
        <div className="w-[25%]">
          <img
            className=" h-[35vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path ? info.detail.profile_path : noImage
            }`}
            alt=""
          />
          <hr className="mt-10  mb-5 border-none h-[2px] bg-zinc-500 " />
          {/* Social Media Links */}
          <div className="flex items-center  gap-5 text-white">
            <a
              target="_blank"
              href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}
            >
              <IoEarth className="text-2xl  hover:text-cyan-500" />
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <FaFacebook className="text-2xl  hover:text-cyan-500" />
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <FaInstagram className="text-2xl hover:text-cyan-500 " />
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <FaXTwitter className="text-2xl  hover:text-cyan-500" />
            </a>
          </div>
          {/* Personal Information */}
          <div className=" mt-3 ">
            <h1 className=" text-2xl text-zinc-400 font-semibold ">
              Personal Info
            </h1>
            <h1 className=" text-lg text-zinc-400 font-semibold mt-1">
              Known For
            </h1>
            <h1 className="text-zinc-400">
              {info.detail.known_for_department}
            </h1>
            <h1 className=" text-lg text-zinc-400 font-semibold mt-1">
              Gender
            </h1>
            <h1 className="text-zinc-400">
              {info.detail.gender === "2" ? "Male" : "Female"}
            </h1>
            <h1 className=" text-lg text-zinc-400 font-semibold mt-1">
              Birthday
            </h1>
            <h1 className="text-zinc-400">{info.detail.birthday}</h1>
            <h1 className=" text-lg text-zinc-400 font-semibold mt-1">Death</h1>
            <h1 className="text-zinc-400">
              {info.detail.deathday ? "info.detail.deathday" : "Still Alive"}
            </h1>
            <h1 className=" text-lg text-zinc-400 font-semibold mt-1">
              Place of Birth
            </h1>
            <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>
            <h1 className="text-lg text-zinc-400 font-semibold mt-1 ">
              Also Known As
            </h1>
            <h1 className=" text-zinc-400 ">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>
        </div>
        {/* Part 3 right Details and information  */}
        <div className="w-[80%] ml-5">
          <h1 className=" text-6xl text-zinc-400 font-semibold ">
            {info.detail.name}
          </h1>
          <h1 className=" text-xl text-zinc-400 font-semibold mt-2">
            popularity
          </h1>
          <span className=" text-white font-semibold text-sm bg-yellow-500 rounded-full w-[5vh] h-[5vh] flex justify-center items-center mt-2">
            {(info.detail.popularity).toFixed(0)}
            <sup>%</sup>
          </span>
          <h1 className=" text-xl text-zinc-400 font-semibold mt-2">
            Biography
          </h1>
          <p className="text-zinc-400 mt-2">{info.detail.biography}</p>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>
          <h1 className=" text-lg text-zinc-400 font-semibold mt-2">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between mt-4">
            <h1 className=" text-xl text-zinc-400 font-semibold mt-4">
              Acting
            </h1>
            <Dropdown
              title="Catgory"
              options={["tv", "movie"]}
              func={(e) => setcatgory(e.target.value)}
            />
          </div>
          <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5 ">
            {info[catgory + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 rounded hover:bg-[#19191d]  duration-300 cursor-pointer"
              >
                <Link to={`/${catgory}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_title || c.original_name}
                  </span>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name:  ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default personDetails;
