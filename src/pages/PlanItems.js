import React from "react";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import PlanItem from "./PlanItem";

function PlanItems({
  plan,
  id,
  onDelete,
  markAsCompleted,
  markAsNotCompleted,
  completed,
}) {
  const exerciseArray = Object.entries(plan)
    .filter((row) => row[0].includes("Exercises"))
    .map((row) => row[1]);

  return (
    <main className="w-full relative">
      <div className="w-full bg-slate-700 shadow-lg h-full mb-6 text-white pt-6 pb-6 border-spacing-3 rounded-md  px-4 py-2 border-4 border-slate-800">
        <p className="text-xl font-bold  mb-2 text-center uppercase">
          {plan.searchFirstExercises[0].level}
        </p>
        <p className="text-md font-bold mb-4 text-center">
          {plan.searchFirstExercises[0].category}
        </p>

        <div className="w-[150px] h-[150px] mx-auto mb-6 flex items-center justify-center overflow-hidden border-spacing-3 border-2 border-slate-800">
          <img
            loading="lazy"
            src={`/exercisesDir/${plan.searchFirstExercises[0].images[0]}`}
            alt="Exercise"
            className="object-cover w-full h-full "
          />
        </div>

        {exerciseArray.map((exercises, idx) => (
          <PlanItem plan={exercises} key={idx} id={id} />
        ))}

        <FaTrash
          className="absolute bottom-4 right-4 h-6 w-6 cursor-pointer text-red-500"
          onClick={() => onDelete(id)}
        />

        {completed ? (
          <FaCheck
            className="absolute bottom-4 right-16 h-6 w-6 cursor-pointer text-green-500"
            onClick={() => markAsNotCompleted(id)}
          />
        ) : (
          <FaTimes
            className="absolute bottom-4 right-16 h-6 w-6 cursor-pointer text-red-500"
            onClick={() => markAsCompleted(id)}
          />
        )}
      </div>
    </main>
  );
}

export default PlanItems;
