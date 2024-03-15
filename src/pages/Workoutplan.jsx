import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import Exercises from "./Exercises";

const Workoutplan = () => {
  const params = useParams();
  const auth = getAuth();
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      const docRef = doc(db, "workoutplans", params.workoutplanID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWorkouts(docSnap.data());
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, [params.workoutplanID]);

  if (loading) {
    return (
      <div>
        <h1>You have to wait</h1>
      </div>
    );
  }

  const exerciseArray = Object.entries(workouts)
    .filter((row) => row[0].includes("Exercises"))
    .map((row) => row[1]);

  return (
    <main className="w-full">
      <h1 className=" text-3xl text-center mt-6 font-serif">Workout plan</h1>
      <div className="w-full">
        {exerciseArray.map((exercises, idx) => (
          <Exercises exercises={exercises} key={idx} />
        ))}
      </div>
    </main>
  );
};

export default Workoutplan;
