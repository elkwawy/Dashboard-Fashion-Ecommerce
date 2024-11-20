import brand1 from "../assets/images/brand1.svg";
import brand2 from "../assets/images/brand2.svg";
import brand3 from "../assets/images/brand3.svg";
import brand4 from "../assets/images/brand4.svg";
import brand5 from "../assets/images/brand5.svg";
function Brands() {
  return (
    <div className="brands container pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2  md:gap-4  lg:gap-6 max-sm:m-[30px] ">
      <img src={brand1} className="w-60 h-[75px]" alt="" />
      <img src={brand2} className="w-60 h-[75px]" alt="" />
      <img src={brand4} className="w-60 h-[75px]" alt="" />
      <img src={brand3} className="w-60 h-[75px] " alt="" />
      <img
        src={brand5}
        className="w-40 h-[75px] max-sm:w-20 max-sm:h-[73px] max-sm:ml-4"
        alt=""
      />
    </div>
  );
}

export default Brands;
