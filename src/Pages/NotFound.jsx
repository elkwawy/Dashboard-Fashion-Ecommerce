import { Link } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaRegCircle } from "react-icons/fa6";
const NotFound = () => {
  return (

   <section className="relative">
    <FaRegCircle  className="absolute top-[10%] left-[70%] text-5xl text-gray-900 " />

     <div className="flex flex-col items-center justify-center min-h-[90vh] relative">
    
      <h1 className="text-4xl md:text-9xl  font-bold text-gray-900 relative"> <HiOutlineXMark  className="text-4xl  text-gray-900 rotate-[-20deg] font-bold absolute top-[-100%] md:top-[-30%]  left-[0%] "/>404 <FaRegCircle  className="absolute top-[10%] left-[100%] text-xl text-gray-900 " /></h1>

      <h2 className="text-xl md:text-5xl font-bold text-gray-800 mt-4 relative">
      <HiOutlineXMark  className="text-3xl  text-gray-900 rotate-[-20deg] font-bold absolute top-[-100%] md:top-[-60%] left-[-10%]"/>
        Page Not Found
      </h2>

      <p className="text-center w-[50%] xl:w-[70%] text-gray-500 mt-2 ">
        we’re sorry. the page you requested could no be found <br />
        Please go back to the home page
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-200 relative"
      >
        Go Home
        <HiOutlineXMark  className="text-4xl  text-gray-900 rotate-[-20deg] font-bold absolute top-[80%] left-[130%]"/>
      </Link>

      {/* Optional decorative elements (circles and lines) */}
     
      <img
        src={require("../assets/images/notFound1.png")}
        className="absolute top-[-300px] md:top-[-200px] xl:top-[-180px] lg:top-[-80px] left-[-160px] xl:left-8 md:left-[-90px] z-[-5555]  w-[80%]
         sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rotate-[20deg] xl:rotate-[0deg]"
      />
      <FaRegCircle  className="absolute top-[85%] left-[20%] text-3xl text-gray-900 " />
    
      </div>
    
   
   </section>
  );
};

export default NotFound;
