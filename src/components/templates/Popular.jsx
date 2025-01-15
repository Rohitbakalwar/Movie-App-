import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TopNav from "../templates/TopNav";
import Dropdown from "../templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./Cards";
import Loading from "../Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${Category}/popular?page=${page}`);
      // console.log("datata", data.results);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setpage(1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category]);
  return popular.length > 0 ? (
    <div className="w-screen h-screen pt-5 ">
      <div className=" px-[5%] w-full flex items-center justify-center ">
        <h1 className="hover:text-cyan-500 text-2xl font-semibold text-zinc-400 pt-1 pr-2">
          <FaArrowLeft onClick={(e) => navigate(-1)} />
        </h1>{" "}
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          Popular
          <small className="text-sm ml-2 to-zinc-600">({Category})</small>
        </h1>
        <div className="w-[80%]">
          <TopNav />
        </div>
        <Dropdown
          title="Category"
          options={["movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasmore}
        loader={<Loading />}
      >
        <Cards data={popular} title={Category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
