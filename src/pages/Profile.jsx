import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    age: auth.currentUser.age,
    height: auth.currentUser.height,
    weight: auth.currentUser.weight,
    workoutExperience: auth.currentUser.workoutExperience,
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const [changeImage, setChangeImage] = useState(false);

  const { name, email, age, weight, height, workoutExperience } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function changeProfileImage(e) {}

  return (
    <>
      <section className=" flex flex-col justify-center items-center px-6 py-12 max-w-6xl mx-auto">
        <h1 className=" text-3xl text-center mt-6 font-serif">My profile</h1>
        <div className="w-full mt-6 px-3">
          <form>
            {/* User avatar */}
            <div className="flex flex-col text-3xl items-center">
              <div className="w-48 h-48 rounded-full bg-blue-500 overflow-hidden flex items-center justify-center">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src="https://api.ngo.pl/media/get/129879?w=800&h=533"
                  alt=""
                />
              </div>
              <p
                className="flex items-center mt-3 text-gray-700 hover:text-red-700"
                onClick={() => {
                  setChangeImage((prevState) => !prevState);
                }}
              >
                {changeImage ? (
                  <>
                    <div className="flex flex-col mb-6 justify-center items-center">
                      <p className="text-lg font-semibold">Profile picture</p>
                      <input
                        type="file"
                        id="profileImage"
                        accept=".jpg, .png, .jpeg"
                        className="w-full text-xl px-3 py-1.5 text-gray-700 bg-white border-gray-300 rounded
                        transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 "
                      />
                    </div>
                  </>
                ) : (
                  "Edit"
                )}
              </p>
            </div>
            <div className="flex flex-col justify-center mt-6 items-center">
              {/* Username */}
              <input
                type="text"
                id="name"
                value={name}
                className="mb-3 w-[50%] px-4 py-2 text-xl text-black bg-white border border-gray-800 rounded transition ease-in-out"
                disabled={!changeDetails}
                onChange={onChange}
              />
              {/*  e-mail */}
              <input
                type="email"
                id="email"
                value={email}
                className="mb-3 w-[50%] px-4 py-2 text-xl text-black bg-white border border-gray-800 rounded transition ease-in-out"
                disabled={!changeDetails}
                onChange={onChange}
              />
              {/* age */}
              <input
                type="number"
                min={13}
                max={100}
                id="age"
                value={age}
                className="mb-3 w-[50%] px-4 py-2 text-xl text-black bg-white border border-gray-800 rounded transition ease-in-out"
                disabled={!changeDetails}
                onChange={onChange}
                placeholder={age === undefined ? "age" : age}
              />
              {/* Height */}
              <input
                type="number"
                id="height"
                value={height}
                className="mb-3 w-[50%] px-4 py-2 text-xl text-black bg-white border border-gray-800 rounded transition ease-in-out"
                disabled={!changeDetails}
                onChange={onChange}
                min={90}
                max={280}
                placeholder={height === undefined ? "height" : height}
              />
              {/* Weight */}
              <input
                type="number"
                id="weight"
                value={weight}
                className="mb-3 w-[50%] px-4 py-2 text-xl text-black bg-white border border-gray-800 rounded transition ease-in-out"
                disabled={!changeDetails}
                onChange={onChange}
                min={40}
                max={300}
                placeholder={weight === undefined ? "weight" : weight}
              />
              <input
                type="number"
                id="workoutExperience"
                value={workoutExperience}
                className="mb-3 w-[50%] px-4 py-2 text-xl text-black bg-white border border-gray-800 rounded transition ease-in-out"
                disabled={!changeDetails}
                onChange={onChange}
                placeholder={
                  workoutExperience === undefined
                    ? "workout experience"
                    : workoutExperience
                }
              />
            </div>

            <div className="flex justify-center mt-2 items-center">
              <p className="flex items-center">
                Do you want to change something?
              </p>
              <span
                className="text-red-600 hover:text-red-700 transition ease-in-out 
              duration-200 ml-1 cursor-pointer"
                onClick={() => {
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? "Apply" : "Change"}
              </span>
            </div>
          </form>
        </div>
        <button
          type="submit"
          className=" w-[50%]  mt-4  h-[60px] uppercase font-semibold  bg-slate-700 border-spacing-3 rounded-md text-white px-4 py-2 border-2 border-slate-800"
        >
          <Link
            to="/create-workout"
            className="flex justify-center items-center"
          >
            Get your plan
          </Link>
        </button>
      </section>
    </>
  );
};

export default Profile;
