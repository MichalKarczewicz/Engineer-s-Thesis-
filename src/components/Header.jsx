import React from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 border-b shadow-md sticky top-0 z-40 text-white">
      <header className="flex justify-between items-center px-3 max-x-6xl mx-auto">
        <div>
          <div>
            <h1
              className="h-5 font-semibold uppercase shadow-2xl cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Gym Workout Planner
            </h1>
          </div>
        </div>
        <div>
          <ul className="flex space-x-10 px-3 py-3">
            <li
              className="py-3 font-semibold border-b-4 text-sm cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className="py-3 font-semibold border-b-4 text-sm cursor-pointer"
              onClick={() => {
                navigate("/people");
              }}
            >
              People
            </li>
            <li
              className="py-3 font-semibold border-b-4 text-sm cursor-pointer"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
