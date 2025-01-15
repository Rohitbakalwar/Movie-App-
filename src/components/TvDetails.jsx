import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { aysncloadtv } from "../store/actions/tvActions";
import { removetv } from "../store/actions/tvActions";
import { FaArrowLeft } from "react-icons/fa6";
import Loading from "../components/Loading";
import { IoEarth } from "react-icons/io5";
import { FaImdb } from "react-icons/fa";
import { FaWikipediaW } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import HorizontalCards from "./templates/HorizontalCards";
const noImage = "/public/noimages.png";

const tvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(aysncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-[210%] px-[10%] "
    >
      {/* part 1 navigation */}
      <nav className=" h-[10vh] text-white w-full flex items-center gap-10">
        <h1 className="hover:text-cyan-500 text-2xl  font-semibold text-zinc-200 pt-1 pr-2">
          <FaArrowLeft onClick={(e) => navigate(-1)} />
        </h1>

        <a target="_blank" href={info.detail.homepage}>
          <IoEarth
            title={info.detail.homepage}
            className="text-xl  hover:text-cyan-500"
          />
        </a>
        <a
          target="_blank"
          href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}
        >
          <FaWikipediaW
            title="Wikipedia"
            className="text-xl hover:text-cyan-500 "
          />
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          <FaImdb title="Imdb" className="text-xl  hover:text-cyan-500" />
        </a>
      </nav>

      {/* part 2 poster */}
      <div className="w-full flex ">
        <img
          className=" h-[50vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />
        <div className="content ml-[5%]  text-white">
          <h1 className="text-white text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_title ||
              info.detail.original_name}
            <small className="text-2xl font-bold text-zinc-200">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>
          <div className=" mt-3 mb-5 flex text-white items-center gap-x-3">
            <span className=" text-white font-semibold text-sm bg-yellow-500 rounded-full w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl w-[60px] leading-6">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mt-3 mb-2">Overview</h1>
          <p>{info.detail.overview}</p>
          <h1 className="text-2xl mt-3 mb-2">tv Translations</h1>
          <p className="mb-5">{info.translations.join(", ")}</p>
          <Link
            to={`${pathname}/trailer`}
            className=" flex items-center bg-cyan-500 p-5 rounded-lg w-[18%]"
          >
            <FaPlayCircle className="text-xl mr-1" />
            <h3 className="text-xl font-semibold"> Play Trailer</h3>
          </Link>
        </div>
      </div>

      {/* part 3 Available on paltform */}
      <div className=" w-[80%] flex flex-col  mt-8 gap-y-3">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-5  items-center text-white font-semibold">
            <h1>Available on paltform</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="object-cover flex w-[5vh] h-[5vh] rounded-md "
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-5   items-center text-white font-semibold">
            <h1>Available to buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="object-cover w-[5vh] h-[5vh] rounded-md "
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-5   items-center text-white font-semibold ">
            <h1>Available to rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                className="object-cover w-[5vh] h-[5vh] rounded-md "
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.ads && (
          <div className="flex gap-x-5   items-center text-white font-semibold ">
            <h1>Available to rent</h1>
            {info.watchproviders.ads.map((w, i) => (
              <img
                title={w.provider_name}
                className="object-cover w-[5vh] h-[5vh] rounded-md "
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* part 4 seasons */}

      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500 " />
      <h1 className="text-white text-3xl font-bold">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5 ">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div key={i} className="w-[15vh] mr-[8%]">
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[10vw] h-[35vh] object-cover"
                src={
                  s.poster_path
                    ? `https://image.tmdb.org/t/p/original/${s.poster_path}`
                    : noImage
                }
                alt=""
              />
              <h1 className="text-2xl text-zinc-300 mt-3 font-semibold ">
                {s.name}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-3xl mt-5 text-white font-black text-center">
            Nothing to show
          </h1>
        )}
      </div>

      {/* part 5 recommendations & similar */}

      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500 " />
      <h1 className="text-white text-3xl font-bold">
        Recommendations & Similar Stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.results.length > 0
            ? info.recommendations.results
            : info.similar.results
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default tvDetails;
