import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import PeoplePlanItem from "./PeoplePlanItem";

const People = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserPlans() {
      try {
        const planRef = collection(db, "workoutplans");
        const q = query(planRef, orderBy("timestamp", "desc"));

        const querySnap = await getDocs(q);
        let plans = [];
        querySnap.forEach((doc) => {
          plans.push({
            id: doc.id,
            data: doc.data(),
            completed: doc.data().completed || false,
          });
        });
        setWorkoutPlans(plans);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workout plans:", error);
        setLoading(false);
      }
    }
    fetchUserPlans();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {workoutPlans.map((plan) => (
            <PeoplePlanItem key={plan.id} plan={plan} id={plan.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
