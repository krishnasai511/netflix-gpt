import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black">
      <h1 className="font-bold text-6xl">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="bg-white p-3 px-10 font-bold rounded-md text-lg text-black hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="bg-gray-200 p-3 px-10 font-bold mx-2 rounded-md bg-opacity-50 text-lg">
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
