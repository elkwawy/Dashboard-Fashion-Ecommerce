import Cookies from "js-cookie";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../redux/slices/userSlice";
import Loader from "../utils/Loader";

const Sidebar = React.lazy(() => import("../components/sidebar/Sidebar"));
const PathTracker = React.lazy(() =>
  import("../components/sidebar/PathTracker")
);

const RootLayout = () => {
  //                 sidebar open in large screens and close in small screens
  const [sidebar, setSidebar] = useState(window.innerWidth > 700);

  const dispatch = useDispatch();
  const userToken = Cookies.get("token");

  const { user, status, error } = useSelector((state) => state.user);

  // Fetch user data on initial load if a token exists
  useEffect(() => {
    if (userToken) {
      dispatch(getCurrentUser(JSON.parse(userToken)));
    }
  }, [dispatch, userToken]);

  // Handle authentication
  if (!userToken) {
    return <Navigate to="/" replace />;
  }

  // Handle error state
  if (status === "failed" && error) {
    return (
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center gap-5">
        <p className="font-bold text-xl">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-2 rounded-md text-white bg-main-color hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Component rendering
  return (
    <div className="w-full flex h-screen overflow-hidden">
      <Suspense
        fallback={
          <div className="h-full flex items-center justify-center w-full min-[700px]:w-[32%] lg:w-1/4 xl:w-1/6">
            <Loader />
          </div>
        }
      >
        <Sidebar sidebar={sidebar} closeSidebar={() => setSidebar(false)} />
      </Suspense>
      <div className="flex w-full flex-col">
        <Navbar sidebar={sidebar} openSidebar={() => setSidebar(true)} />
        <div className="flex flex-col gap-5 w-full pt-5 h-screen bg-background-color overflow-y-auto openPageDiv">
          <Suspense
            fallback={
              <div className="w-44 h-2 bg-gray-100 trans animate-pulse"></div>
            }
          >
            <PathTracker />
          </Suspense>
          <div className="px-2 min-[300px]:px-5 w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
