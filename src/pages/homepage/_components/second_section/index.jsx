import React from "react";
import { Button } from "../../../../components";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { cost, image1 } from "../../../../constants/images";

const SecondSection = () => {
  return (
    <>
      <div className="pb-10 flex lg:flex-row flex-col items-center justify-between container mx-auto container-md">
        <div className="relative justify-center w-full items-center lg:items-start lg:justify-start flex bg-[#eee] rounded-[20px] py-10 lg:px-16 gap-y-3 mt-10 lg:w-1/2 flex-col">
          <img
            src={cost}
            className="absolute w-[250px] lg:block hidden right-0"
            alt=""
          />
          <img src="/logo.png" alt="save" className="w-[200px] m-[-2rem]" />
          <span className="lg:text-2xl lg:text-start text-center text-[#49529b]">
            A platform for all your <br /> financial needs
          </span>
          <div className="flex gap-x-4 items-center">
            <Button
              backgroundColor={"#535bd3"}
              border="none"
              className={`text-nowrap rounded-[5px] font-semibold ease-in-out md:!px-[10px] md:!py-[8px] md:text-xs lg:!px-[20px] lg:!py-[10px] xl:text-base `}
            >
              Download
            </Button>
            <div className="flex items-center text-sm lg:text-base font-medium text-[#181818] gap-x-2 pt-2 cursor-pointer group">
              <Link to="/prototype/signup">Learn more</Link>
              <GoArrowRight
                size={27}
                className="group-hover:translate-x-2 transition-all ease-in"
              />
            </div>
          </div>
        </div>
        <div className="flex bg-[#eee] items-center justify-center rounded-[20px] py-10 w-full lg:px-16 gap-y-3 mt-10 lg:w-[40%] flex-col">
          <img src="/logo.png" alt="save" className="w-[200px] m-[-2rem]" />
          <span className="lg:text-2xl text-[#49529b]">
            Get notified of launch
          </span>
          <div className="flex flex-col gap-y-2 items-center">
            <input
              type="email"
              name="email"
              id="email"
              className="py-2 px-5 text-sm lg:text-base"
              placeholder="Enter email"
            />
            <div className="flex text-sm items-center font-medium text-[#181818] gap-x-2 pt-2 cursor-pointer group">
              <Link to="#">Learn more</Link>
              <GoArrowRight
                size={22}
                className="group-hover:translate-x-2 transition-all ease-in"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="capitalize mx-auto w-full text-center text-[#49529b] mb-3">
        🚧 under construction
      </div>
    </>
  );
};

export default SecondSection;
