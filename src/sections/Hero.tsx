import React from "react";
import MainLinkBtn from "../components/MainLinkBtn";
const Hero = () => {
  return (
    <section className="bg-[url('/food-image.webp')] w-full min-h-[500px] bg-no-repeat bg-cover bg-center relative flex justify-start items-center px-6">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white  z-10 bg-opacity-35"></div>
      <div className="w-[1380px] max-w-full  m-auto relative z-20 space-y-3">
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-my_red">Recipes</span>{" "}
        </h1>
        <h2 className="text-xl font-medium">
          {" "}
          Discover, Cook, and Save Your Favorite Culinary Creations
        </h2>

        <MainLinkBtn text="Random Recipes" url="/explore" />
      </div>
    </section>
  );
};

export default Hero;
