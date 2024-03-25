import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiThumbDownLine,
  RiThumbDownFill,
} from "react-icons/ri";

const PeoplePlanItem = ({ plan }) => {
  const [userDisplayName, setUserDisplayName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("__name__", "==", plan.data.userRef));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            setUserDisplayName(userData.name);
          });
        } else {
          console.log("No matching user found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [plan.data.userRef]);

  return (
    <Link to={`/${plan.id}`} className="w-full p-4">
      <div className="p-4 flex flex-col justify-between h-full border-2 rounded-lg text-white bg-slate-800 text-center">
        <div>
          <p className="font-bold">Created by {userDisplayName}</p>
          <p className="text-blue-600">
            {plan.data.searchFirstExercises[0].level}
          </p>
          <p className="text-green-600">
            {plan.data.searchFirstExercises[0].category}
          </p>
          <img
            src={`/exercisesDir/${plan.data.searchFirstExercises[0].images[0]}`}
            alt="Exercise"
            className="w-full h-40 object-cover my-2"
          />
          {plan.data.searchFirstExercises.map((exercise, index) => (
            <p key={index} className="truncate">
              {exercise.name}
            </p>
          ))}
        </div>
        <div className="flex justify-end items-center mt-2">
          <button className="mr-2 focus:outline-none">
            <RiThumbUpLine className="text-blue-500 text-xl" />
          </button>
          <button className="focus:outline-none">
            <RiThumbDownLine className="text-red-500 text-xl" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PeoplePlanItem;
