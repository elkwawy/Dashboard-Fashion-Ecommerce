import aboutUS from "../../assets/images//About US/AboutUS.jpg";
import Brands from "../../components/Brands";

const AboutUS = () => {
  return (
    <div className="aboutUs">
      {/* Hero Section */}
      <div className="relative w-full h-[445px] mb-14">
        <img src={aboutUS} className="w-full h-full" alt="" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h3 className="text-5xl font-bold text-white">About Us</h3>
        </div>
      </div>

      {/* Brands Section */}
      <Brands />
      {/* Our Story Section */}
      <div className="container">
        <h3 className="text-5xl font-bold text-center mt-24 font-[Ribeye]">
          Our Story
        </h3>
        <p className="font-[400] text-[28px] text-center mt-5">
          At Style Club, we bring together a curated collection of renowned
          fashion brands for men, women, and children. Our platform offers an
          easy way to access the latest trends and timeless styles from trusted
          names in the industry.
        </p>
      </div>
      {/* Stats Section */}
      <div className="mt-32 p-14 sm:p-20 bg-[#DEDCDF80] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center">
          <img src={require("../../assets/icons/aboutUs/about1.png")} alt="" />
          <p className="mt-6 font-[500] text-[28px] text-center">
            100 + <br />
            Popular Brands
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src={require("../../assets/icons/aboutUs/about2.png")} alt="" />
          <p className="mt-6 font-[500] text-[28px] text-center">
            10,000 + <br />
            Happy Shoppers
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src={require("../../assets/icons/aboutUs/about3.png")} alt="" />
          <p className="mt-6 font-[500] text-[28px] text-center">
            50,000 + <br />
            Orders Delivered
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src={require("../../assets/icons/aboutUs/about4.png")} alt="" />
          <p className="mt-6 font-[500] text-[28px] text-center">
            5 Years <br />
            Exprience
          </p>
        </div>
      </div>
      {/* Our Mission Section */}
      <div className="container">
        <h3 className="font-bold text-[48px] text-center mt-32 font-[Ribeye]">
          Our Mission
        </h3>
        <p className="font-[400] text-[28px] text-center mt-3">
          Our goal is to offer a one-stop fashion destination, Providing a wide
          selection of premium brands in clothing and accessorie that cater to
          every style and accasion
        </p>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-sm:flex flex-col items-center">
          <img
            src={require("../../assets/images/About US/womens.png")}
            alt=""
            className="rounded"
          />
          <img
            src={require("../../assets/images/About US/children.png")}
            alt=""
            className="rounded"
          />
          <img
            src={require("../../assets/images/About US/mens.png")}
            alt=""
            className="rounded"
          />
        </div>
      </div>
      {/* Why Choose Us? */}
      <div className="container">
        <h3 className="font-bold text-[48px] text-center mt-32 font-[Ribeye]">
          Why Choose Us?
        </h3>
        <p className="font-[400] text-[28px] text-center mt-3  mb-32 ">
          With a variety of top brands in one place, we make shopping simple,
          convenient, and enjoyable. Discover premium fashion, exceptional
          quality, and the latest collections all in one trusted location
        </p>
      </div>
    </div>
  );
};
export default AboutUS;
