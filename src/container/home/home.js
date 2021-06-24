import React from "react";

import Hero from "../../component/hero/hero";
import Navbar from "../../component/navbar/navbar";
import Content from "../../component/Content/Content";
import HomepageContent from "../../component/Homepage/Homepage";

const Home = () => (
  <div className="bg-yellow-50">
    <Navbar />
    <Hero content={<HomepageContent />} />
    <Hero content={<Content />} />
  </div>
);

export default Home;
