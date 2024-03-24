"use client";
import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import Reviews from "../data/testimonials.json";
import Rating from "../components/Rating";
const Testimonials = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <section className="w-[1380px] max-w-full  m-auto py-20 px-6">
      <h2 className="text-3xl font-medium text-center mb-10 underline decoration-wavy decoration-my_red underline-offset-8">
        Testimonials
      </h2>

      <div className="px-10">
        <Carousel
          plugins={[plugin.current]}
          className="w-full m-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="flex gap-3">
            {Reviews.reviews.map((item, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 bg-white border border-gray-200 shadow-md p-2 rounded flex flex-col"
                >
                  <h4 className="font-semibold">{item.username}</h4>
                  <p>{item.comment}</p>
                  <div className="mt-auto pt-2">
                    <Rating rate={item.rating} />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
