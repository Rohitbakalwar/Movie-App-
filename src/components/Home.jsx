import { React, useState, useEffect } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import Header from "./templates/Header";
import axios from "./utils/axios";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "Movie App | Homepage";

  const [wallpaper, setwallpaper] = useState("");
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomData);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/day`);
      // console.log("datata",data.results);
      settrending(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden ">
        <TopNav />
        <Header data={wallpaper} />
        <div className="p-5 flex items-center justify-between">
          <h1 className="text-3xl text-zinc-400 font-semibold">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;
