import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const [pageState, setPageState] = useState("SignIn");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const checkCurrentPathname = (route) => {
    if (route === location.pathname) return true;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("SignIn");
      }
    });
  }, [auth]);

  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  return (
    <div className="bg-gray-900 border-b border-b-gray-700 shadow-lg sticky top-0 z-40 text-white">
      <header className="flex justify-between items-center px-3 max-w-[100rem] mx-auto">
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
          <ul className="flex space-x-10 px-3 py-3 text-base">
            <li
              className={`py-3 font-semibold border-b-4 cursor-pointer ${
                checkCurrentPathname("/") &&
                "border-b-orange-300 transition duration-300 ease-in-out"
              }`}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className={`py-3 font-semibold border-b-4 cursor-pointer  ${
                checkCurrentPathname("/people") &&
                "border-b-orange-300 duration-300 ease-in-out"
              }`}
              onClick={() => {
                navigate("/people");
              }}
            >
              People
            </li>
            <li
              className={`py-3 font-semibold border-b-4 cursor-pointer ${
                checkCurrentPathname("/profile") &&
                "border-b-orange-300 duration-300 ease-in-out"
              }`}
              onClick={() => {
                navigate(`/${pageState}`);
              }}
            >
              {pageState === "Profile" ? pageState : "Sing In"}
            </li>
            {pageState === "Profile" ? (
              <li className={`py-3 font-semibold border-b-4 cursor-pointer`}>
                <button onClick={onLogout}>Logout</button>
              </li>
            ) : null}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
