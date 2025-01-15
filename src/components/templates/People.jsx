import React from "react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TopNav from "../templates/TopNav";
import axios from "../utils/axios";
import Cards from "./Cards";
import Loading from "../Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`person/${Category}?page=${page}`);
      // console.log("datata", data.results);
      if (data.results.length > 0) {
        setpeople((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      GetPeople();
    } else {
      setpage(1);
      setpeople([]);
      GetPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return people.length > 0 ? (
    <div className="w-screen h-screen pt-5">
      <div className=" px-[5%] w-full flex items-center justify-center">
        <h1 className="hover:text-cyan-500 text-2xl font-semibold text-zinc-400 pt-1 pr-2">
          <FaArrowLeft onClick={(e) => navigate(-1)} />
        </h1>{" "}
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          People
          <small className="text-sm ml-2 to-zinc-600">({Category})</small>
        </h1>
        <div className="w-[80%]">
          <TopNav />
        </div>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople}
        hasMore={hasmore}
        loader={<Loading />}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
