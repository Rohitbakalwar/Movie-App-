import React from "react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TopNav from "../templates/TopNav";
import Dropdown from "../templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./Cards";
import Loading from "../Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("all");
  const [Duration, setDuration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `trending/${Category}/${Duration}?page=${page}`
      );
      // console.log("datata", data.results);
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category, Duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen pt-5">
      <div className=" px-[5%] w-full flex items-center justify-center">
        <h1 className="hover:text-cyan-500 text-2xl font-semibold text-zinc-400 pt-1 pr-2">
          <FaArrowLeft onClick={(e) => navigate(-1)} />
        </h1>{" "}
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          Trending
          <small className=" uppercasetext-sm ml-2 to-zinc-600">({Category})</small>
        </h1>
        <div className="w-[80%]">
          <TopNav />
        </div>
        <Dropdown
          title="Category"
          options={["all", "movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasmore}
        loader={<Loading />}
      >
        <Cards data={trending} title={Category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
