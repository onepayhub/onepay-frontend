import React from "react";
import { Navbar } from "../../components";
import { HeroSection, SecondSection, ThirdSection } from "./_components";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ThirdSection />
      <SecondSection />     
    </div>
  );
};

export default HomePage;
