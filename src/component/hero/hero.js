import React from "react";

const Hero = (props) => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center">
        {props.content}
      </div>
    </div>
  );
};

export default Hero;
