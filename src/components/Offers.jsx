function Offers() {
  let offers = [
    {
      sale: "Discount 20%",
      title: "All Items",
      img: require("../assets/images/offer1.png"),
    },
    {
      sale: "Relaxed fit",
      title: "Overshirt",
      img: require("../assets/images/offer2.png"),
    },
    {
      sale: "Discount 50%",
      title: "All Shoes",
      img: require("../assets/images/offer3.png"),
    },
  ];
  return (
    <div className="offers py-10 container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
      {offers.map((offer, index) => (
        <div
          key={index}
          className="offer flex justify-center gap-2 max-md:gap-6 items-center bg-[#E8E5E9] rounded-lg h-[207px]  max-sm:w-[320px]"
        >
          <div className="details pl-1">
            <span className="text-[#222222] font-[600] text-[25px]  block mt-4 ml-8 max-sm:text-[25px]">
              {offer.sale} <br />
              {offer.title}
            </span>
            <button className="text-[#FFFFFF] font-[600] text-[18px] bg-[#222222] w-[122px] h-[43px] rounded-md m-4 ml-8 max-sm:w-[100px] max-sm:text-[14px]">
              Shop Now
            </button>
          </div>
          <img src={offer.img} className="pr-6 w-[174px] h-[207px] " alt="" />
        </div>
      ))}
    </div>
  );
}

export default Offers;
