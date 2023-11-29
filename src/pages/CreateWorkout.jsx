import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateWorkout = () => {
  const [formData, setFormData] = useState({
    goal: "",
    body: "",
    problemAreas: "",
    age: 20,
    height: 150,
    workoutExperience: 0,
  });

  const { goal, body, problemAreas, age, height, workoutExperience } = formData;

  async function onSubmit(e) {}

  function onChange(e) {}

  return (
    <main className="max-w-md px-2 mx-auto mb-10">
      <h1 className="text-3xl text-center mt-6 font-bold">
        Get your workout plan
      </h1>
      <form onSubmit={onSubmit} className="pb-4 p-2">
        <p className="text-2xl mt-6 font-semibold text-center">
          Choose your goal
        </p>
        <div className="flex w-full mt-6 rounded ">
          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Lose Weight
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Gain Muscle Mass
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Get Shredded
          </button>
        </div>

        <p className="text-2xl mt-6 font-semibold text-center">
          Choose the body you want
        </p>
        <div className="flex w-full mt-6 rounded ">
          <button
            type="button"
            id="type"
            value="body"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Athlete
          </button>

          <button
            type="button"
            id="type"
            value="body"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Bodybuilder
          </button>
        </div>

        <p className="text-2xl mt-6 font-semibold text-center">
          Select problem areas
        </p>
        <div className="flex w-full mt-6 rounded ">
          <button
            type="button"
            id="type"
            value={problemAreas}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Weak chest
          </button>

          <button
            type="button"
            id="type"
            value={problemAreas}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Slim arms
          </button>

          <button
            type="button"
            id="type"
            value={problemAreas}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Beer belly
          </button>

          <button
            type="button"
            id="type"
            value={problemAreas}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Slim Legs
          </button>
        </div>

        <div className="flex items-center mb-6 mt-6 justify-center">
          <div>
            <p className="text-lg font-semibold text-center">Age</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={age}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-gry-700 bg-white
                        border border-gray-300 rounded transition duration-150 ease-in-out 
                        focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-6 mt-6 justify-center">
          <div>
            <p className="text-lg font-semibold text-center">Height</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={height}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-gry-700 bg-white
                        border border-gray-300 rounded transition duration-150 ease-in-out 
                        focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-6 mt-6 justify-center">
          <div>
            <p className="text-lg font-semibold text-center">
              Workout Experience
            </p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={workoutExperience}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-gry-700 bg-white
                        border border-gray-300 rounded transition duration-150 ease-in-out 
                        focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
          </div>
        </div>

        <p className="text-2xl mt-6 font-semibold text-center">
          Choose calisthenic exercises you like
        </p>
        <div className="flex w-full mt-6 rounded ">
          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Pull ups
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Push ups
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Pistol squat
          </button>
        </div>

        <p className="text-2xl mt-6 font-semibold text-center">
          Choose exercises you like (2)
        </p>
        <div className="flex w-full mt-6 rounded ">
          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Bench press
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Deadlift
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Squats
          </button>
        </div>

        <p className="text-2xl mt-6 font-semibold text-center">
          Choose exercises you like (3)
        </p>
        <div className="flex w-full mt-6 rounded ">
          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            OHP
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Barbell Row
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Calf Raises
          </button>
        </div>

        <p className="text-2xl mt-6 font-semibold text-center">
          Choose exercises you like (4)
        </p>
        <div className="flex w-full mt-6 rounded ">
          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Burpees
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            planks
          </button>

          <button
            type="button"
            id="type"
            value="goal"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Glute bridge
          </button>
        </div>

        <button
          type="submit"
          className=" w-full  mt-5 h-[60px] uppercase font-semibold  bg-slate-700 border-spacing-3 rounded-md text-white px-4 py-2 border-2 border-slate-800"
        >
          Create plan
        </button>
      </form>
    </main>
  );
};

export default CreateWorkout;
