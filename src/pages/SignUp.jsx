import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: null,
  });

  const { name, email, password, age } = formData;

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold border-b-gray-700">
        Sign Up
      </h1>
      <div className="flex items-center flex-col border-4 justify-center text-xl mt-6 max-w-[80rem] mx-auto">
        <form>
          <div className="relative mt-6">
            <AiOutlineMail className="absolute top-[13px] right-2" />
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Full name"
              className="w-[350px] px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
            />
          </div>
          <div className="relative ">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              className="w-[350px] px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              className="w-[350px] px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
            />
          </div>
          <div className="relative">
            <input
              type="number"
              id="age"
              placeholder="Age"
              value={age}
              min={10}
              max={120}
              className="w-[200px]px-4 py-2 text-xl text-gry-700 bg-white
              border border-gray-300 rounded transition duration-150 ease-in-out 
              focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <button
            type="submit"
            className="mt-6 mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-lg uppercase rounded shadow-md "
          >
            Sign up
          </button>

          {/* Register with google */}
        </form>
      </div>
    </section>
  );
};

export default SignUp;
