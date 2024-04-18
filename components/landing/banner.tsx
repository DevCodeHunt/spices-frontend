"use client";

import useBanners from "@/hooks/useBanners";
import { TBanner } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import Slider from "react-slick";

const CustomDot = ({
  onClick,
  active,
}: {
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <div
      className={`w-4 h-4 mx-1 mt-4 rounded-full border-2 border-primary hover:bg-primary transition duration-300 ${
        active ? "bg-primary" : ""
      } focus:outline-none`}
      onClick={onClick}
    ></div>
  );
};

const Banner = () => {
  const { banners } = useBanners();
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);
  const sliderRef = React.useRef<Slider | null>(null);

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    waitForAnimate: false,
    pauseOnHover: true,
    arrows: false,

    appendDots: (dots: React.ReactNode) => (
      <ul className=" flex justify-center">{dots}</ul>
    ),
    customPaging: (i: number) => (
      <CustomDot onClick={() => sliderRef.current?.slickGoTo(i)} active={currentSlide === i} />
    ),
    afterChange: (current: number) => setCurrentSlide(current)
  };

  const handlePrevious = React.useCallback(() => {
    sliderRef.current?.slickPrev();
  }, []);

  const handleNext = React.useCallback(() => {
    sliderRef.current?.slickPrev();
  }, []);

  return (
    <section className="relative pb-8">
      <div>
        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-primary z-10 flex items-center justify-center text-white hover:bg-primary transition duration-300"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-primary z-10 flex items-center justify-center text-white hover:bg-primary transition duration-300"
        >
          <ChevronRight />
        </button>
      </div>
      <Slider ref={sliderRef} {...settings} className="w-full h-full">
        {banners?.map((banner: TBanner, index: number) => (
          <div key={index} className="md:h-[70vh] h-[50vh]">
            <div
              style={{
                backgroundImage: `url(${banner?.image.url})`,
              }}
              className="h-full w-full bg-cover bg-no-repeat bg-center"
            >
              <div className="container text-white h-full flex flex-col justify-center">
                <h1 className="md:w-1/2 w-full lg:text-6xl md:text-5xl text-4xl font-semibold">
                  {banner?.title}
                </h1>
                <p className="md:w-1/2 w-full mt-4">{banner?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
