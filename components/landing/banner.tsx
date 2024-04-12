"use client";

import { banners } from "@/constants";
import { TBanner } from "@/types";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const Banner = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoPlay: true,
    autoplaySpeed: 500,
  };
  return (
    <section className="">
      <Slider {...settings} className="w-full h-full">
        {banners?.map((banner: TBanner, index: number) => (
          <div
            key={index}
            className="md:h-[80vh] h-[60vh]"
          >
            
            <div  style={{
                backgroundImage: `url(${banner.image})`,
              }} className="h-full w-full bg-cover bg-no-repeat bg-center">
              <div className="container text-white h-full flex flex-col justify-center">
                <h1 className="md:w-1/2 w-full text-2xl font-semibold">{banner.title}</h1>
                <p className="md:w-1/2 w-full">{banner.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
