import React from "react";
import { Navbar } from "../../components";
import { HeroSection, SecondSection } from "./_components";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SecondSection />
    </div>
  );
};

export default HomePage;
