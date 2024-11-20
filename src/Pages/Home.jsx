import { Link } from "react-router-dom";
import Brands from "../components/Brands";
import BtnLoad from "../components/BtnLoad";
import HeroSlider from "../components/HeroSlider";
import Offers from "../components/Offers";
import Products from "../components/Products";
import SeasonCollection from "../components/SeasonCollection";
import { memo } from "react";
const Home = memo(() => {
  
  return (
    <div className="home">
      <HeroSlider />
      <SeasonCollection />
      <div className="flex justify-center mt-10 mb-[-20px] max-sm:gap-4 items-center gap-8">
        <Link
          to="best-seller"
          className="text-[#222222] font-[500] text-[32px] max-sm:text-[25px] max-[400px]:text-[20px]"
        >
          Best Seller
        </Link>
        <Link
          to="new-arrivals"
          className="text-[#8E8E90] font-[500] text-[32px] hover:text-[#222222] max-sm:text-[25px] max-[400px]:text-[20px]"
        >
          New Arrivals
        </Link>
        <Link
          to="on-sale"
          className="text-[#8E8E90] font-[500] text-[32px] hover:text-[#222222] max-sm:text-[25px] max-[400px]:text-[20px]"
        >
          On Sale
        </Link>
      </div>
      <Products />
      <BtnLoad />
      <Offers />
      <Brands />
    </div>
  );
})

export default Home;
