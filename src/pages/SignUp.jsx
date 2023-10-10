import React, { useState } from "react";
import { AiOutlineMail, AiFillUnlock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

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

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userData.user;

      const formDataWithoutPassword = {
        ...formData,
      };
      delete formDataWithoutPassword.password;
      formDataWithoutPassword.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataWithoutPassword);
      toast.success("Registered successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <section>
      <div className="flex justify-center items-center py-12 max-w-6xl mx-auto">
        <div className="w-full md:w-[70%] lg:w-[40%] lg:ml-20 bg-gray-900  px-12 py-6 rounded-tr-3xl  rounded-bl-3xl rounded-tl-xl rounded-br-3xl">
          <p className="text-3xl font-bold w-full text-center text-white">
            Sign Up
          </p>
          <form onSubmit={onSubmit}>
            <div className="relative mt-6">
              <BsFillPersonFill className="absolute top-[13px] right-3 text-xl" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={onChange}
                placeholder="Full name"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
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
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
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
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              />
            </div>

            <button
              type="submit"
              className="mt-3 mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-lg uppercase rounded shadow-md hover:bg-blue-800 transition duration-200 ease-in-out"
            >
              Sign up
            </button>

            <div className="grid grid-rows-2 whitespace-nowrap text-sm sm:text-lg  text-white">
              <p className="mb-2 ">
                Have a account?
                <Link
                  to="/signIn"
                  className="text-blue-300 hover:text-blue-500 transition duration-200 ease-in-out ml-1"
                >
                  Sign In
                </Link>
              </p>
              <p>
                Forgot password?
                <Link
                  to="/forgotPassword"
                  className="text-blue-300 hover:text-blue-500 transition duration-200 ease-in-out ml-1"
                >
                  Reset password
                </Link>
              </p>
            </div>

            {/* Register with google */}
            {/* Register with Facebook */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
