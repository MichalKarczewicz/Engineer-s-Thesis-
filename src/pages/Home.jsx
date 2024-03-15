import React, { useEffect, useState } from "react";
import homePage from "../assets/homePageImage.jpg";
import { RiSearchLine } from "react-icons/ri";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredExercises = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredExercises);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getRandomExercises();
  }, [exercises]);

  return (
    <div className="w-full h-full bg-gray-300">
      <div className="relative w-full h-[60vh]">
        <img
          src={homePage}
          alt="HomePageImage"
          className="w-full h-full brightness-100 saturate-200 contrast-150 object-cover"
        />
      </div>
      <div className="w-full px-3 py-3 flex flex-col items-center">
        <div className="my-4 w-full">
          <div className="relative gap-8 md:mx-[10%]">
            <input
              type="text"
              placeholder="Search exercise..."
              className="w-full border text-lg border-slate-800 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <RiSearchLine className="text-gray-400 border-slate-800" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:mx-[10%] justify-center items-center uppercase font-semibold">
          {(searchTerm ? searchResults : selectedExercises).map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white grid grid-cols-2 p-4 rounded-lg transform hover:scale-105 transition-transform"
            >
              <div>
                <img
                  src={`/exercisesDir/${exercise.images[0]}`}
                  alt={exercise.name}
                  className="w-full h-52 object-cover mb-2 rounded-sm break-word"
                />
              </div>

              <div className="text-center text-gray-800 flex justify-center items-center flex-col mx-8">
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
