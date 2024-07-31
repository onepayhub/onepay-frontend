import React from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

import {
  image2,
  image4,
  image5,
  image6,
  image7,
  image9,
} from "../../../../constants/images";

const HeroSection = () => {
  return (
    <div className="bg-[#eee] relative px-10 lg:rounded-[20px] py-10 lg:mt-20 mt-0 rounded-tr-none rounded-tl-none container mx-auto container-md">
      <img
        src={image2}
        alt="image"
        className="absolute w-[50px] lg:w-[100px] left-[0%] lg:left-[2%] bottom-[30%]"
      />
      <img
        src={image6}
        alt="image"
        className="absolute w-[50px] lg:w-[100px] right-0 top-[0%]"
      />
      <img
        src={image7}
        alt="image"
        className="absolute w-[50px] lg:w-[100px] left-[20%] lg:left-[11%] bottom-[7%]"
      />
      <img
        src={image9}
        alt="image"
        className="absolute w-[50px] lg:w-[100px] left-2 bottom-[2%]"
      />
      <img
        src={image5}
        alt="image"
        className="absolute w-[50px] lg:w-[100px] bottom-[3%] right-[3%] md:right-[1%]"
      />
      <img
        src={image4}
        alt="image"
        className="absolute w-[50px] lg:w-[100px] bottom-[20%] lg:bottom-[30%] right-[5%]"
      />
      <div className="flex gap-y-2 justify-center h-[50vh]  mx-auto  items-center flex-col">
        <div className="flex flex-col tracking-widest">
          <span className="uppercase font-semibold text-[#49529b] text-center text-lg lg:text-6xl">
            <span className="text-[#181818]">beyond</span>{" "}
            <br className="lg:hidden block" /> payment and transfers
            {""}
            <br />
            One account for all
          </span>
        </div>
        <span className="text-[#31376d] py-2 text-sm text-center">
          We're revolutionizing the fintech landscape by eliminating the hassle
          of requesting money. <br /> Experience the thrill of seamless
          transactions as you effortlessly send and receive funds with just a
          tap.
        </span>
        <div className="flex items-center font-medium text-[#181818] gap-x-2 pt-2 cursor-pointer group">
          <Link to="/prototype/signup" className="lg:text-base text-xs">
            View our prototype
          </Link>
          <GoArrowRight
            size={27}
            className="group-hover:translate-x-2 transition-all ease-in"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
