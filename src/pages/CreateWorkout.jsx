import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./../firebase";

const CreateWorkout = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("./exercises.json");
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Loading data error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    level: "",
    category: "",
    goal: "",
    body: "",
    problemAreas: "",
    age: 20,
    height: 150,
    workoutExperience: 0,
    calisthenic: "",
    topExercise: "",
    secondExercise: "",
    thirdExercise: "",
  });

  const {
    level,
    goal,
    category,
    body,
    problemAreas,
    age,
    height,
    workoutExperience,
  } = formData;

  // Function for selecting the level of advancement
  const searchByLevel = (level) => {
    const matchingElements = [];
    const searchNested = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          searchNested(obj[key]);
        } else if (key === "level" && obj[key] === level) {
          matchingElements.push(obj);
        }
      }
    };
    searchNested(exercises);
    return matchingElements;
  };

  const searchByCategory = (data, category) => {
    let matchingElements = [];
    const searchNested = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          searchNested(obj[key]);
        } else if (key === "category" && obj[key] === category) {
          matchingElements.push(obj);
        }
      }
    };
    searchNested(data);

    if (matchingElements.length > 200) {
      matchingElements = matchingElements
        .sort(() => 0.5 - Math.random())
        .slice(0, 200);
    } else if (matchingElements.length < 50) {
      data = data.sort(() => 0.5 - Math.random()).slice(0, 200);
      return data;
    }

    return matchingElements;
  };

  const searchByBody = (data, body) => {
    const matchingElements = [];
    const searchNested = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          searchNested(obj[key]);
        } else if (key === "body" && obj[key] === body) {
          matchingElements.push(obj);
        }
      }
    };
    searchNested(data);

    if (matchingElements.length > 150) {
      matchingElements = matchingElements
        .sort(() => 0.5 - Math.random())
        .slice(0, 150);
    } else if (matchingElements.length < 50) {
      data = data.sort(() => 0.5 - Math.random()).slice(0, 150);
      return data;
    }
  };

  const searchByProblemAreas = (data, problemAreas) => {
    const matchingElements = [];
    const searchNested = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          searchNested(obj[key]);
        } else if (key === "problemAreas" && obj[key] === problemAreas) {
          matchingElements.push(obj);
        }
      }
    };
    searchNested(data);

    if (matchingElements.length > 100) {
      matchingElements = matchingElements
        .sort(() => 0.5 - Math.random())
        .slice(0, 100);
    } else if (matchingElements.length < 50) {
      data = data.sort(() => 0.5 - Math.random()).slice(0, 100);
      return data;
    }
  };

  const searchExercises = (data, calisthenic) => {
    const matchingElements = [];
    const searchNested = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          searchNested(obj[key]);
        } else if (key === "calisthenic" && obj[key] === calisthenic) {
          matchingElements.push(obj);
        }
      }
    };
    searchNested(data);

    if (matchingElements.length > 100) {
      matchingElements = matchingElements
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    } else if (matchingElements.length < 50) {
      data = data.sort(() => 0.5 - Math.random()).slice(0, 3);
      return data;
    }
  };

  const searchExercises2 = (data, topExercise) => {
    const matchingElements = [];
    const searchNested = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          searchNested(obj[key]);
        } else if (key === "topExercise" && obj[key] === topExercise) {
          matchingElements.push(obj);
        }
      }
    };
    searchNested(data);

    if (matchingElements.length > 100) {
      matchingElements = matchingElements
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    } else if (matchingElements.length < 50) {
      data = data.sort(() => 0.5 - Math.random()).slice(0, 3);
      return data;
    }
  };

  const searchExercises3 = (data, secondExercise) => {
    const matchingElements = [];
    const searchNested = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          searchNested(obj[key]);
        } else if (key === "secondExercise" && obj[key] === secondExercise) {
          matchingElements.push(obj);
        }
      }
    };
    searchNested(data);

    if (matchingElements.length > 100) {
      matchingElements = matchingElements
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    } else if (matchingElements.length < 50) {
      data = data.sort(() => 0.5 - Math.random()).slice(0, 3);
      return data;
    }
  };

  const searchExercises4 = (data, thirdExercise) => {
    const matchingElements = [];
    const searchNested = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          searchNested(obj[key]);
        } else if (key === "thirdExercise" && obj[key] === thirdExercise) {
          matchingElements.push(obj);
        }
      }
    };
    searchNested(data);

    if (matchingElements.length > 100) {
      matchingElements = matchingElements
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    } else if (matchingElements.length < 50) {
      data = data.sort(() => 0.5 - Math.random()).slice(0, 3);
      return data;
    }
  };

  async function onSubmit(e) {
    e.preventDefault();

    const {
      level,
      category,
      goal,
      body,
      problemAreas,
      age,
      height,
      workoutExperience,
      calisthenic,
      topExercise,
      secondExercise,
      thirdExercise,
    } = formData;

    const searchLevel = searchByLevel(level);
    const searchCategory = searchByCategory(searchLevel, category);
    const searchBody = searchByBody(searchCategory, body);
    const searchProblemAreas = searchByProblemAreas(searchBody, problemAreas);
    const searchFirstExercises = searchExercises(
      searchProblemAreas,
      calisthenic
    );
    const searchSecondExercises = searchExercises2(
      searchProblemAreas,
      topExercise
    );

    const searchThirdExercises = searchExercises3(
      searchProblemAreas,
      secondExercise
    );
    const searchFourExercises = searchExercises4(
      searchProblemAreas,
      thirdExercise
    );

    const formDataCopy = {
      searchFirstExercises,
      searchSecondExercises,
      searchThirdExercises,
      searchFourExercises,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    const docRef = await addDoc(collection(db, "workoutplans"), formDataCopy);

    toast.success("Workout created");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <main className="max-w-md px-2 mx-auto mb-10">
      <h1 className="text-3xl text-center mt-6 font-bold">
        Get your workout plan
      </h1>
      <form onSubmit={onSubmit} className="pb-4 p-2">
        <p className="text-2xl mt-6 font-semibold text-center">
          Choose your Level
        </p>
        <div className="flex w-full mt-6 rounded ">
          <button
            type="button"
            id="level"
            value="beginner"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Beginner
          </button>

          <button
            type="button"
            id="level"
            value="intermediate"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            intermediate
          </button>

          <button
            type="button"
            id="level"
            value="expert"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            expert
          </button>
        </div>

        <p className="text-2xl mt-6 font-semibold text-center">
          Choose your goal
        </p>
        <div className="flex w-full mt-6 rounded ">
          <button
            type="button"
            id="category"
            value="cardio"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Lose Weight
          </button>

          <button
            type="button"
            id="category"
            value="powerlifting"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Gain Muscle Mass
          </button>

          <button
            type="button"
            id="category"
            value="strength"
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
            id="body"
            value="cardio"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Athlete
          </button>

          <button
            type="button"
            id="body"
            value="powerlifting"
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
            id="problemAreas"
            value="chest"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Weak chest
          </button>

          <button
            type="button"
            id="problemAreas"
            value="biceps"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Slim arms
          </button>

          <button
            type="button"
            id="problemAreas"
            value="abdominals"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Beer belly
          </button>

          <button
            type="button"
            id="problemAreas"
            value="glutes"
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
                id="age"
                value={age}
                onChange={onChange}
                min="8"
                max="99"
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
                id="height"
                value={height}
                onChange={onChange}
                min="140"
                max="250"
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
                id="workoutExperience"
                value={workoutExperience}
                onChange={onChange}
                min="0"
                max="50"
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
            id="calisthenic"
            value="pull"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Pull ups
          </button>

          <button
            type="button"
            id="calisthenic"
            value="push"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Push ups
          </button>

          <button
            type="button"
            id="calisthenic"
            value="glutes"
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
            id="topExercise"
            value="bench press"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Bench press
          </button>

          <button
            type="button"
            id="topExercise"
            value="deadlift"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Deadlift
          </button>

          <button
            type="button"
            id="topExercise"
            value="squat"
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
            id="secondExercise"
            value="ohp"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            OHP
          </button>

          <button
            type="button"
            id="secondExercise"
            value="barbell row"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Barbell Row
          </button>

          <button
            type="button"
            id="secondExercise"
            value="calf raises"
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
            id="thirdExercise"
            value="burpees"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            Burpees
          </button>

          <button
            type="button"
            id="thirdExercise"
            value="plank"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase 
                    shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                    transition duration-150 ease-in-out w-full`}
          >
            planks
          </button>

          <button
            type="button"
            id="thirdExercise"
            value="glutes"
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
