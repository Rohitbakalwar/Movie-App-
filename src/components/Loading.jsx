import React from "react";
const loader = "/loader.gif";
// import loader2 from "/public/loader2.gif";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[20%] object-cover" src={loader} alt="" />
    </div>
  );
};

export default Loading;
