"use client";

import { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AnimatedEmoji } from "./animations";

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaAction: () => void;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  autoplaySpeed?: number;
}

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-200 group border border-gray-200"
  >
    <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
  </motion.button>
);

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-200 group border border-gray-200"
  >
    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
  </motion.button>
);

// Custom Dots Component
const CustomDots = ({ dots }: { dots: React.ReactNode }) => (
  <div className="flex justify-center space-x-2 mt-6">
    {dots}
  </div>
);

export const HeroCarousel = ({ 
  slides, 
  autoplay = true, 
  autoplaySpeed = 4000 
}: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay,
    autoplaySpeed,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <motion.button
        whileHover={{ scale: 1.2 }}
        className={`w-3 h-3 rounded-full transition-all duration-200 ${
          i === currentSlide 
            ? "bg-gradient-to-r from-amber-500 to-purple-500" 
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      />
    ),
    appendDots: (dots: React.ReactNode) => <CustomDots dots={dots} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "20px",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "0px",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "0px",
        }
      }
    ]
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
      <style>{`
        .hero-carousel .slick-slider {
          position: relative;
          display: block;
          box-sizing: border-box;
          user-select: none;
          touch-action: pan-y;
          -webkit-tap-highlight-color: transparent;
        }

        .hero-carousel .slick-list {
          position: relative;
          display: block;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        .hero-carousel .slick-track {
          position: relative;
          top: 0;
          left: 0;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-carousel .slick-track:before,
        .hero-carousel .slick-track:after {
          display: table;
          content: '';
        }

        .hero-carousel .slick-track:after {
          clear: both;
        }

        .hero-carousel .slick-slide {
          display: none;
          float: left;
          height: 100%;
          min-height: 1px;
        }

        .hero-carousel .slick-slide img {
          display: block;
        }

        .hero-carousel .slick-slide.slick-loading img {
          display: none;
        }

        .hero-carousel .slick-slide.dragging img {
          pointer-events: none;
        }

        .hero-carousel .slick-initialized .slick-slide {
          display: block;
        }

        .hero-carousel .slick-loading .slick-slide {
          visibility: hidden;
        }

        .hero-carousel .slick-vertical .slick-slide {
          display: block;
          height: auto;
          border: 1px solid transparent;
        }

        .hero-carousel .slick-arrow.slick-hidden {
          display: none;
        }

        .hero-carousel .slick-dots {
          position: absolute;
          bottom: -25px;
          display: block;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
          text-align: center;
        }

        .hero-carousel .slick-dots li {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
          margin: 0 5px;
          padding: 0;
          cursor: pointer;
        }

        .hero-carousel .slick-dots li button {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 20px;
          height: 20px;
          padding: 5px;
          cursor: pointer;
          color: transparent;
          border: 0;
          outline: none;
          background: transparent;
        }

        .hero-carousel .slick-dots li button:hover,
        .hero-carousel .slick-dots li button:focus {
          outline: none;
        }

        .hero-carousel .slick-dots li.slick-active button {
          color: black;
        }

        .hero-carousel .slick-prev,
        .hero-carousel .slick-next {
          font-size: 0;
          line-height: 0;
          position: absolute;
          top: 50%;
          display: block;
          width: 20px;
          height: 20px;
          padding: 0;
          transform: translate(0, -50%);
          cursor: pointer;
          color: transparent;
          border: none;
          outline: none;
          background: transparent;
        }

        .hero-carousel .slick-prev:hover,
        .hero-carousel .slick-prev:focus,
        .hero-carousel .slick-next:hover,
        .hero-carousel .slick-next:focus {
          color: transparent;
          outline: none;
          background: transparent;
        }

        .hero-carousel .slick-prev:hover:before,
        .hero-carousel .slick-prev:focus:before,
        .hero-carousel .slick-next:hover:before,
        .hero-carousel .slick-next:focus:before {
          opacity: 1;
        }

        .hero-carousel .slick-prev.slick-disabled:before,
        .hero-carousel .slick-next.slick-disabled:before {
          opacity: 0.25;
        }

        .hero-carousel .slick-prev:before,
        .hero-carousel .slick-next:before {
          font-size: 20px;
          line-height: 1;
          opacity: 0.75;
          color: white;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .hero-carousel .slick-prev {
          left: -25px;
        }

        .hero-carousel .slick-next {
          right: -25px;
        }

        .hero-carousel .slick-dotted.slick-slider {
          margin-bottom: 30px;
        }

        .hero-carousel .slick-center .slick-slide {
          transform: scale(1.05);
          z-index: 1;
        }

        .hero-carousel .slick-slide {
          transition: all 0.3s ease;
          transform: scale(0.95);
        }
      `}</style>
      <div className="relative hero-carousel h-[360px] sm:h-[420px] md:h-[480px] lg:h-[500px]">
        <Slider {...settings} className="h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="h-full px-1.5 sm:px-2 md:px-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Section - 70% of card height */}
                <div className="h-[70%] relative overflow-hidden">
                  <ImageWithFallback
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content Section - 30% of card height */}
                <div className="h-[30%] p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-gray-900 line-clamp-1">
                      {slide.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {slide.description}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={slide.ctaAction}
                    className="mt-4 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    {slide.ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

// Sample data for the hero carousel with new Pinterest images
export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Summer Elegance Collection",
    description: "Discover sophisticated summer styles that blend comfort with luxury for the modern wardrobe.",
    image: "https://i.pinimg.com/736x/9e/41/b1/9e41b1610945b4988328d90b1959455e.jpg",
    ctaText: "Shop Summer",
    ctaAction: () => console.log("Navigate to summer collection")
  },
  {
    id: "2",
    title: "Contemporary Men's Wear",
    description: "Elevate your everyday style with our curated collection of premium fashion essentials.",
    image: "https://i.pinimg.com/1200x/db/22/e8/db22e8fed772b6e9e33cfd86b34f4272.jpg",
    ctaText: "Shop Men",
    ctaAction: () => console.log("Navigate to premium collection")
  },
  {
    id: "3",
    title: "Contemporary Women's Wear",
    description: "Modern silhouettes and timeless designs crafted for the confident, contemporary woman.",
    image: 'https://i.pinimg.com/1200x/2b/a8/a9/2ba8a9b86110ecb7f37efbd839e3b501.jpg',
    ctaText: "Shop Women's",
    ctaAction: () => console.log("Navigate to women's collection")
  },
  {
    id: "4",
    title: "Kids Casual Collection",
    description: "Complete and casual fashion crafted for kids.",
    image: "https://i.pinimg.com/736x/66/98/28/669828ffa8f0028f3753f2fead38e3a5.jpg",
    ctaText: "Discover Kids",
    ctaAction: () => console.log("Navigate to urban collection")
  },
  {
    id: "5",
    title: "Designer Accessories",
    description: "Complete your look with our exclusive range of luxury accessories and statement pieces.",
    image: 'https://i.pinimg.com/736x/30/a5/07/30a5070705110358044bb64ff815d8dc.jpg',
    ctaText: "Shop Accessories",
    ctaAction: () => console.log("Navigate to accessories collection")
  },
  
];
