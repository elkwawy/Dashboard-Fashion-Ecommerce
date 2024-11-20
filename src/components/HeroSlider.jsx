import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { Img } from "react-image";
import LoadingSpinner from "../utilities/LoadingSpinner";

const HeroSlider = () => {
    

    // preloading
    useEffect(() => {
        const images = [
            '/heroSlider/men.webp','/heroSlider/women.webp','/heroSlider/children.webp'
        ];
        images.forEach(image => {
            const img = new Image();
            img.src = image;
        }); 
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const changeSlide = (index) => {
        setCurrentSlide(index);
    };

    // Change slide every 5 seconds
    useEffect(() => {
        const slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
        }, 5000);
        return () => clearInterval(slideInterval);
    }, [currentSlide]);
    // md:h-[480px] lg:h-[622px]
    return (
        <div className="relative w-full   overflow-hidden">
        {/* Slider Wrapper */}
        <div
            className="flex transition-transform ease-in-out h-[calc(100vh-74px)] duration-1000"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
            {/* Render each image */}
            <div  className="w-full max-h-full flex-shrink-0 relative overflow-y-hidden">
                <Img
                    src={'/heroSlider/men.webp'}
                    alt={`Slide ${"image1"}`}
                    className={`h-full object-cover w-full`}
                    loader={<div className="bg-gray-300 flex items-center justify-center w-full h-full"><LoadingSpinner /></div>}
                    />
            </div>
            <div  className="w-full max-h-full flex-shrink-0 relative overflow-y-hidden">
                <Img
                    src={'/heroSlider/women.webp'}
                    alt={`Slide ${"image2"}`}
                    className={`h-full object-cover w-full`}
                    loader={<div className="bg-gray-300 flex items-center justify-center w-full h-full"><LoadingSpinner /></div>}
                    />
            </div>
            <div  className="w-full max-h-full flex-shrink-0 relative overflow-y-hidden">
                <Img
                    src={'/heroSlider/children.webp'}
                    alt={`Slide ${"image3"}`}
                    className={`h-full object-cover mx-auto`}
                    loader={<div className="bg-gray-300 flex items-center justify-center w-full h-full"><LoadingSpinner /></div>}
                />
            </div>
        </div>
        {/* max-h-[680px] md:max-h-[622px] */}
        <div className=" absolute flex flex-col justify-center items-center gap-8 top-0 left-0 bg-black/[33%] w-full h-full  z-20">
            <h1 className="font-bold text-white text-[50px] min-[550px]:text-[80px] leading-tight text-center ">Youthful <br /> Summer style</h1>
            <p className="text-white text-center text-[20px] min-[550px]:text-[24px]">Discover the hottest trends and must-have looks</p>
            <Link to={'#'} className="trans group bg-white rounded-md py-6 px-8 trans flex gap-1 items-center font-semibold">
                <p className="text-normal min-[550px]:text-lg bg-white z-10">Shop Collection</p>
                <FaAngleRight className="sm:mt-[3px] transition-all duration-300 sm:z-0 sm:-ml-5 sm:group-hover:ml-0"/>
            </Link>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-30">
            {[1,2,3].map((_, index) => (
            <div
                key={index}
                className={` rounded-full transition-all duration-300  ${
                currentSlide === index ? "bg-black w-[34px] h-[5px] rounded-full mt-[2px]" : "bg-[#D9D9D9] h-[8px] w-[8px]"
                } cursor-pointer`}
                onClick={() => {
                    changeSlide(index);
                    setCurrentSlide(index); 
                }}
            ></div>
            ))}
        </div>
        </div>
    );
};

export default HeroSlider;
