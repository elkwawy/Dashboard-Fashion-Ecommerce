import React, { memo } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";

// Helper function to determine if a part is an ID so we ca ignore it
const isId = (part) => /^[a-f\d]{24}$/i.test(part) || !isNaN(part);

// Helper function to convert newProduct => New Product
const formatPathPart = (part) =>
  part.charAt(0).toUpperCase() + part.slice(1).replace(/([A-Z])/g, " $1");

const PathTracker = memo(() => {
  const { pathname } = useLocation();
  const pathParts = pathname
    .split("/")
    .filter(Boolean)
    .filter((part) => !isId(part)); // Ignore IDs and UUIDs

  // Check if it's the dashboard page
  // to not display Dashboard twice
  const isDashboardPage = pathname === "/dashboard";

  return (
    <div className="px-2 min-[300px]:px-5 flex gap-1 sm:gap-2 text-lg items-center w-full  max-sm:text-sm">
      {/* Always display "Dashboard" */}
      {!isDashboardPage && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${isActive ? "" : "text-sec-color"} trans hover:text-gray-600`
          }
        >
          Dashboard
        </NavLink>
      )}
      {!isDashboardPage && <FaAngleRight className="text-sec-color mt-[2px]" />}

      {pathParts.map((part, index) => {
        const isLast = index === pathParts.length - 1;
        const toPath = `/${pathParts.slice(0, index + 1).join("/")}`;

        return (
          <div key={index} className="flex items-center gap-1 sm:gap-2">
            {index > 0 && <FaAngleRight className="text-sec-color mt-[2px]" />}
            {isLast ? (
              <NavLink
                to={toPath}
                className={({ isActive }) =>
                  `${
                    isActive ? "" : "text-sec-color"
                  } trans hover:text-gray-600`
                }
              >
                {formatPathPart(decodeURIComponent(part))}
              </NavLink>
            ) : (
              <span className="text-sec-color">
                {window.innerWidth < 500 &&
                index > 0 &&
                index < pathParts.length - 1
                  ? "..."
                  : formatPathPart(decodeURIComponent(part))}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default PathTracker;
