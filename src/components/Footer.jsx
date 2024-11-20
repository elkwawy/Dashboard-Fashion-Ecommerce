import { memo } from "react";
import { Link } from "react-router-dom";
const Footer = memo(() => {
  return (
    <div className="footer bg-[#F8F8F8] py-11  sm:py-16">
      <div className="container flex justify-between flex-wrap  max-sm:gap-8 max-sm:flex-col max-sm:items-center  sm:gap-10  lg:gap-8   ">
        <img
          src={require("../assets/icons/logo.png")}
          className="w-[180px] h-[180px] my-auto  "
          alt=""
        />

        <ul className="space-y-1 max-sm:text-center   ">
          <li className="text-[#222222] font-[700] text-[32px] cursor-pointer">
            <Link to="/">Help</Link>
          </li>
          <li className="text-[#222222] font-[400] text-[24px] cursor-pointer transition duration-1000 ease-in-out hover:underline">
            <Link to="/">Privacy policy</Link>
          </li>
          <li className="text-[#222222] font-[400] text-[24px] cursor-pointer hover:underline">
            <Link to="/">Returns and exchange</Link>
          </li>
          <li className="text-[#222222] font-[400] text-[24px] cursor-pointer hover:underline">
            <Link to="/shipping"> Shipping </Link>
          </li>
          <li className="text-[#222222] font-[400] text-[24px] cursor-pointer hover:underline">
            <Link to="/"> Terms & conditions </Link>
          </li>
          <li className="text-[#222222] font-[400] text-[24px] cursor-pointer hover:underline">
            <Link to="/wishlist"> My Wishlist </Link>
          </li>
        </ul>

        <ul className="space-y-1 max-sm:text-center  col-span-1">
          <li className="text-[#222222] font-[700] text-[32px] cursor-pointer">
            About Us
          </li>
          <li className="text-[#222222] font-[400] text-[24px] cursor-pointer hover:underline">
            Our story
          </li>
          <li className="text-[#222222] font-[400] text-[24px] cursor-pointer hover:underline">
            Account
          </li>
        </ul>

        <ul className="text-center space-y-1 col-span-1">
          <li className="text-[#222222] font-[700] text-[32px]">
            Sign Up for email
          </li>
          <li className="text-[#222222] font-[400] text-[18px] w-[284px]">
            Sign Up to get first dips on new arrivals, sales, exclusive content,
            events, and more!
          </li>
          <li className="text-[#222222] font-[400] text-[24px]">
            <button className="w-[278px] h-[60px] rounded-[8px] mt-2 bg-[#F8F8F8] border-[3px] transition duration-300 border-[#222222] border-solid hover:bg-[#222222] hover:text-white">
              Subscribe
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
})

export default Footer;
