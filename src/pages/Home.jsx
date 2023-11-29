import React, { useEffect, useState } from "react";
import homePage from "../assets/homePageImage.jpg";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("./exercises.json");
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Loading data error:", error);
    }
  };

  const getRandomExercises = () => {
    const shuffledExercises = [...exercises].sort(() => 0.5 - Math.random());
    const selected = shuffledExercises.slice(0, 12);
    setSelectedExercises(selected);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getRandomExercises();
  }, [exercises]);

  return (
    <div className="w-full h-full bg-gray-300">
      <div className="relative w-100 h-100">
        <img
          src={homePage}
          alt="HomePageImage"
          className="w-full h-[60vh] brightness-100 saturate-200 contrast-150 object-cover"
        />
      </div>
      <div className="w-full d-flex h-full px-3 py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:mx-[10%] justify-center items-center uppercase font-semibold">
          {selectedExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white grid grid-cols-2  p-4 rounded-lg  transform hover:scale-105 transition-transform"
            >
              <div>
                <img
                  src={`/exercisesDir/${exercise.images[0]}`}
                  alt={exercise.name}
                  className="w-full h-52 object-cover mb-2 rounded-sm break-word"
                />
              </div>

              <div className="text-center  text-gray-800 flex justify-center items-center flex-col mx-8">
                <h2 className="text-xl m-3 text-red-700 font-bold whitespace-no-wrap overflow-hidden">
                  {exercise.name}
                </h2>
                <p className="text-lg m-2">{exercise.level}</p>
                <p>{exercise.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
