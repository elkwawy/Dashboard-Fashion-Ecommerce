import { useEffect, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { API } from "../Api/Api";
import axios from "axios";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ecommerce-dot-code.vercel.app/api/contact",
        formData
      );
      console.log(response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // عرض بيانات الخطأ الواردة من الخادم
      } else {
        console.log("There was an error", error.message); // إذا كانت هناك مشكلة في الاتصال بالخادم
      }
    }
  };
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-4">
        Contact Us
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Send Your Question</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded"
                type="text"
                id="name"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2" htmlFor="email">
                Your Email
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded"
                type="email"
                id="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2" htmlFor="message">
                Your Message
              </label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded h-32 "
                id="message"
                rows="4"
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded"
            >
              Send
            </button>
          </form>
        </div>

        {/* Address Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Address</h2>
          <p className="text-[#8E8E90]">
            <FaLocationDot className="inline w-4 h-5 mr-1 text-[black]" /> Egypt
            , Dakahlia, Mansoura
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Phones</h3>
          <p className="mb-3 text-[#8E8E90]">
            <FiPhone className="inline w-5 h-5 mr-1 text-[black]" /> 01147290516
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Email</h3>
          <p className="text-[#8E8E90] ">
            <MdEmail className="inline w-5 h-5 mr-1 text-[black]" />{" "}
            dotcode16@gmail.com
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Working Hours</h3>
          <p className="text-[#8E8E90]">
            <FaRegClock className="inline w-5 h-5 mr-1 text-[black]" /> Sat-Thu:
            10:00 - 20:00
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.whatsapp.com/"
              target="_blank"
              className="text-2xl"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              className="text-2xl"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-10">
        <iframe
          className="w-full h-80 border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0631303219695!2d107.6191229143144!3d-6.917463994998933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63f0a6af507%3A0x5017d7cf3b09c0e!2sJakarta!5e0!3m2!1sen!2sid!4v1634303994470!5m2!1sen!2sid"
          allowFullScreen=""
          loading="lazy"
          title="Google Maps"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
