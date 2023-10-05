import React, { useState } from "react";
import { AiOutlineMail, AiFillUnlock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const showPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Register</h1>
      <div className="flex justify-center items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="bg-gray-900  px-12 py-12 rounded-tr-3xl  rounded-bl-3xl rounded-tl-xl rounded-br-3xl">
          <form>
            <div className="relative mt-6">
              <BsFillPersonFill className="absolute top-[13px] right-3 text-xl" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={onChange}
                placeholder="Full name"
                className="w-[400px] px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              />
            </div>
            <div className="relative">
              <AiOutlineMail className="absolute top-[13px] right-3 text-xl" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
                value={email}
                className="w-[400px] px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              />
            </div>

            <div className="relative">
              {!passwordVisibility ? (
                <RiLockPasswordLine
                  className="absolute top-[13px] right-3 text-xl"
                  onClick={showPassword}
                />
              ) : (
                <AiFillUnlock
                  className="absolute top-[13px] right-3 text-xl"
                  onClick={showPassword}
                />
              )}
              <input
                type={passwordVisibility ? "text" : "password"}
                id="password"
                placeholder="Password"
                onChange={onChange}
                value={password}
                className="w-[400px] px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              />
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mt-3">
              <p className="mb-6 text-white">
                Have a account?
                <Link
                  to="/signIn"
                  className="text-blue-300 hover:text-blue-500 transition duration-200 ease-in-out ml-1"
                >
                  Sign In
                </Link>
              </p>
              <p>
                <Link
                  to="/forgotPassword"
                  className="text-blue-300 hover:text-blue-500 transition duration-200 ease-in-out"
                >
                  Forgot password?
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="mt-3 mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-lg uppercase rounded shadow-md hover:bg-blue-800 transition duration-200 ease-in-out"
            >
              Sign up
            </button>

            {/* Register with google */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
