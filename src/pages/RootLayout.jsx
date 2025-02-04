import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useCategoryHook from "../hooks/useCategoryHook";
const Sidebar = React.lazy(() => import("../components/Sidebar"));

const RootLayout = () => {

  const { allCategories } = useCategoryHook();

  const allCategoriesNames = allCategories.map((category) => category.name);
   
  const [sidebar, setSidebar] = useState(true);
  const openSidebar = () => setSidebar(true);
  const closeSidebar = () => setSidebar(false);
  const [baseRealLink, setBaseRealLink] = useState("");
  const [subRealLink, setSubRealLink] = useState("");
  const [lastRealLink, setLastRealLink] = useState("");
  const [baseLink, setBaseLink] = useState("");
  const [subLink, setSubLink] = useState("");
  const [lastLink, setLastLink] = useState("");
  const loc = useLocation();

  const linksToObj = {
    "/dashboard": { text: "Dashboard" },
    admin: {
      text: "Admins",
      children: {
        adminList: { text: "Admins List" },
        newAdmin: { text: "Add new admin" },
      },
    },
    products: {
      text: "Products",
      children: {
        products: { text: "Products" },
        newProduct: { text: "New Product" },
      },
    },
    categories: {
      text: "Categories",

      children: {
        "women's": {
          text: "Women's",
          children: {
            categoryList: { text: "Category List" },
            newCategory: { text: "New Category" },
          },
        },
        "men's": {
          text: "Men's",
          children: {
            categoryList: { text: "Category List" },
            newCategory: { text: "New Category" },
          },
        },
        children: {
          text: "Children",
          children: {
            categoryList: { text: "Category List" },
            newCategory: { text: "New Category" },
          },
        },
      },
    },
    order: { text: "Orders", children: { orderList: { text: "Orders List" } } },
    user: {
      text: "Users",
      children: {
        usersList: { text: "Users List" },
        newUser: { text: "New User" },
      },
    },
  };
  const userToken = Cookies.get("token");
  const nav = useNavigate();

  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    setBaseRealLink(pathParts[0] || "");
    setSubRealLink(pathParts[1] || "");
    setLastRealLink(pathParts[2] || "");
    // Handle baseLink (top-level link)
    const baseObj = linksToObj[pathParts[0]];
    const baseLink = baseObj ? baseObj.text : "";

    // Handle subLink (second-level link if exists)
    const subObj =
      baseObj && baseObj.children ? baseObj.children[pathParts[1]] : null;
    const subLink = subObj ? subObj.text : "";

    // Handle lastLink (third-level link if exists)
    const lastObj =
      subObj && subObj.children ? subObj.children[pathParts[2]] : null;
    const lastLink = lastObj ? lastObj.text : "";

    setBaseLink(baseLink);
    setSubLink(subLink);
    setLastLink(lastLink);
  }, [loc.pathname]);

  if (!userToken) {
    nav("/");
  }

  return (
    <div className="w-full flex overflow-x-hidden h-screen ">
      <Sidebar
        sidebar={sidebar}
        closeSidebar={closeSidebar}
        baseLink={baseRealLink}
        subLink={subRealLink}
        lastLink={lastRealLink}
      />
      <div className="flex w-full flex-col">
        <Navbar sidebar={sidebar} openSidebar={openSidebar} />

        {/* whatever put in the App Router comes here  */}

        {/* This is the only div that overflows (Scroll) */}
        <div className=" flex flex-col gap-5 w-full  pt-5 h-screen bg-background-color  overflow-y-scroll openPageDiv">
          <div className="px-2 min-[300px]:px-5  flex gap-1 sm:gap-2 text-lg items-center w-full max-[373px]:text-xs max-sm:text-sm">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                `${isActive ? "" : "text-sec-color"} trans hover:text-gray-600 `
              }
            >
              Dashboard
            </NavLink>

            {baseLink && (
              <div className="flex items-center gap-1 sm:gap-2  ">
                <FaAngleRight className="text-sec-color mt-[2px]" />
                <span className="text-sec-color ">
                  <span className="max-[370px]:hidden">{baseLink}</span>{" "}
                  <span className="min-[370px]:hidden">...</span>
                </span>
              </div>
            )}
            {subLink && (
              <div className="flex items-center gap-1 sm:gap-2 ">
                <FaAngleRight className="text-sec-color mt-[2px] " />
                <span
                  className={` outline-0 ${
                    lastLink
                      ? "text-sec-color "
                      : " cursor-pointer trans hover:text-gray-600"
                  }`}
                >
                  {subLink}
                </span>
              </div>
            )}

            {lastLink && (
              <div className="flex items-center gap-1 sm:gap-2 w-fit">
                <FaAngleRight className="text-sec-color mt-[2px] " />
                <span className="cursor-pointer w-fit">{lastLink}</span>
              </div>
            )}
          </div>
          {/*  dashboard content comes here  */}
          <div className={"px-2 min-[300px]:px-5  w-full h-full"}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
