import React from "react";

const Exercises = ({ exercises }) => {
  return (
    <div>
      {exercises.map((exercise, key) => (
        <div
          key={key}
          className="max-w-full md:max-w-2xl mx-auto flex flex-col md:flex-row bg-white rounded-xl mb-5 shadow-md overflow-hidden"
        >
          <div className="md:w-70 md:p-8">
            <div className="uppercase tracking-wide text-2xl text-indigo-500 font-semibold">
              {exercise.name}
            </div>
            <h3 className="mt-1 text-xl font-semibold text-gray-900">
              {exercise.category}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{exercise.level}</p>
            <div className="mt-2 text-gray-500">
              <ol>
                {exercise.instructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ol>
            </div>
            <div className="mt-4">
              <p className="text-gray-700 font-semibold">Primary Muscles:</p>
              <p className="text-gray-700">
                {exercise.primaryMuscles.join(", ")}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-700 font-semibold">Secondary Muscles:</p>
              <p className="text-gray-700">
                {exercise.secondaryMuscles.join(", ")}
              </p>
              {/* Obrazek pod sekcją Secondary Muscles */}
              <p className="text-gray-700 font-semibold mt-4">Image:</p>
              {exercise.images.length > 0 && (
                <img
                  src={`/exercisesDir/${exercise.images[0]}`}
                  alt={exercise.name}
                  className="mt-2 w-300 h-300 bg-gray-200 object-cover"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Exercises;
