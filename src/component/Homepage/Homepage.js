import React from "react";

const HomepageContent = () => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="lg:text-9xl md:text-7xl text-5xl font-black text-green-600">
          Kulkasku
        </h1>
        <h2 className="lg:text-6xl md:text-4xl text-2xl font-black text-gray-500 mb-14">
          Your kitchen companion
        </h2>
        <button className="py-4 px-8 rounded-full shadow-md text-gray-700 text-3xl bg-yellow-500 hover:bg-yellow-600 items-center">
          <text>Order Now</text>
        </button>
      </div>
    </div>
  );
};

export default HomepageContent;
