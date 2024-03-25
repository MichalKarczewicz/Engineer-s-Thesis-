import { getAuth, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  addDoc,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Workoutplan from "./WorkoutPlan";
import PlanItem from "./PlanItem";
import { CgGym } from "react-icons/cg";
import PlanItems from "./PlanItems";
import AchievementItem from "./AchievementItem";

const Profile = () => {
  const auth = getAuth();
  const [workoutplans, setWorkoutPlans] = useState(null);
  const [rewardPlans, setRewardPlans] = useState(null);
  const [completedPlans, setCompletedPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [achievement, setAchievement] = useState([]);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    age: "",
    height: "",
    weight: "",
    workoutExperience: "",
  });

  // Reszta kodu komponentu Profile

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = doc(db, "users", auth.currentUser.uid);
        const usersInfoRef = doc(db, "usersInfo", auth.currentUser.uid);

        const usersInfoSnapshot = await getDoc(usersInfoRef);

        if (usersInfoSnapshot.exists()) {
          const userInfoData = usersInfoSnapshot.data();
          setFormData((prevData) => ({
            ...prevData,
            age: userInfoData.age || "",
            height: userInfoData.height || "",
            weight: userInfoData.weight || "",
            workoutExperience: userInfoData.workoutExperience || "",
          }));

          // Sprawdź czy dokument zawiera pola workoutPlansCount i workoutPlansCompletedCount
          if (
            !userInfoData.hasOwnProperty("workoutPlansCount") ||
            !userInfoData.hasOwnProperty("workoutPlansCompletedCount")
          ) {
            console.log("Missing fields in usersInfo document. Updating...");
            const defaultValues = {
              workoutPlansCount: userInfoData.workoutPlansCount || 0,
              workoutPlansCompletedCount:
                userInfoData.workoutPlansCompletedCount || 0,
            };
            await setDoc(usersInfoRef, defaultValues, { merge: true });
          }

          // Sprawdź liczbę planów treningowych użytkownika
          const workoutPlansCount = userInfoData.workoutPlansCount || 0;
          // Sprawdź liczbę ukonczonych planów treningowych użytkownika
          const workoutPlansCompletedCount =
            userInfoData.workoutPlansCompletedCount || 0;

          // Pobierz odpowiednią nagrodę na podstawie liczby planów treningowych
          let reward = "BronzeAwardPlansCreated";
          if (workoutPlansCount >= 3 && workoutPlansCount <= 6) {
            reward = "SilverAwardPlansCreated"; // Możesz dodać kolejne warunki dla innych nagród
          }
          if (workoutPlansCount > 6) {
            reward = "GoldAwardPlansCreated";
          }
          setRewardPlans(reward);

          // Pobierz odpowiednią nagrodę na podstawie liczby planów treningowych
          let rewardCompletedPlans = "BronzeCompletedPlans";
          if (
            workoutPlansCompletedCount >= 3 &&
            workoutPlansCompletedCount <= 6
          ) {
            rewardCompletedPlans = "SilverCompletedPlans"; // Możesz dodać kolejne warunki dla innych nagród
          }
          if (workoutPlansCompletedCount > 6) {
            rewardCompletedPlans = "GoldCompletedPlans";
          }
          setCompletedPlans(rewardCompletedPlans);

          // Pobierz nagrodę z kolekcji achievements
          const achievementsRef = doc(db, "achievements", reward);
          const achievementsSnapshot = await getDoc(achievementsRef);
          const achievementsData = achievementsSnapshot.exists()
            ? [achievementsSnapshot.data()]
            : [];

          // Pobierz nagrodę z kolekcji achievements
          const achievementsPlansRef = doc(
            db,
            "achievements",
            rewardCompletedPlans
          );
          const achievementsPlansSnapshot = await getDoc(achievementsPlansRef);
          const achievementsPlansData = achievementsPlansSnapshot.exists()
            ? [achievementsPlansSnapshot.data()]
            : [];

          // Ustaw nową wartość dla achievement
          setAchievement([...achievementsData, ...achievementsPlansData]);
        } else {
          console.log("UserInfo document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  const [changeDetails, setChangeDetails] = useState(false);
  const [changeImage, setChangeImage] = useState(false);

  const { name, email, age, weight, height, workoutExperience } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  useEffect(() => {
    async function fetchUserPlans() {
      const planRef = collection(db, "workoutplans");
      const q = query(
        planRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);
      let plans = [];
      querySnap.forEach((doc) => {
        return plans.push({
          id: doc.id,
          data: doc.data(),
          completed: doc.data.completed || false,
        });
      });
      setWorkoutPlans(plans);
      setLoading(false);
    }
    fetchUserPlans();
  }, [auth.currentUser.uid]);

  async function onDelete(workoutplan) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "workoutplans", workoutplan));
      const updatedListings = workoutplans.filter(
        (workoutplans) => workoutplan.id !== workoutplan
      );
      setWorkoutPlans(updatedListings);
      toast.success("Successfully deleted");
    }
  }

  async function markAsCompleted(planId) {
    try {
      const docRef = doc(db, "workoutplans", planId);
      const planData = {
        completed: true,
      };
      await updateDoc(docRef, planData);
      const userInfoRef = doc(db, "usersInfo", auth.currentUser.uid);
      const userInfoSnapshot = await getDoc(userInfoRef);
      let workoutPlansCompletedCount = 0;

      if (userInfoSnapshot.exists()) {
        // Jeśli dokument użytkownika istnieje, zaktualizuj pole workoutPlansCount
        workoutPlansCompletedCount =
          userInfoSnapshot.data().workoutPlansCompletedCount || 0;
      }

      const userInfoData = {
        workoutPlansCompletedCount: workoutPlansCompletedCount + 1,
      };
      await updateDoc(userInfoRef, userInfoData);
      console.log("Plan marked as completed successfully");
      updatePlanState(planId, true); // Aktualizujemy stan planu w stanie komponentu
    } catch (error) {
      console.error("Error marking plan as completed:", error);
    }
  }

  async function markAsNotCompleted(planId) {
    try {
      const docRef = doc(db, "workoutplans", planId);
      const planData = {
        completed: false,
      };
      await updateDoc(docRef, planData);
      console.log("Plan marked as not completed successfully");
      updatePlanState(planId, false); // Aktualizujemy stan planu w stanie komponentu
    } catch (error) {
      console.error("Error marking plan as not completed:", error);
    }
  }

  async function updatePlanState(planId, completed) {
    setWorkoutPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId ? { ...plan, completed: completed } : plan
      )
    );
  }

  async function onSubmit() {
    const { name, email, age, height, weight, workoutExperience } = formData;

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        email: email,
      });

      const userInfoRef = doc(db, "usersInfo", auth.currentUser.uid);
      const userInfoSnapshot = await getDoc(userInfoRef);
      const userInfoData = {
        age: age,
        height: height,
        weight: weight,
        workoutExperience: workoutExperience,
      };

      if (userInfoSnapshot.exists()) {
        // If userInfo document exists, update only the fields that the user wants to change
        const userInfoFieldsToUpdate = {};
        Object.keys(userInfoData).forEach((key) => {
          if (userInfoData[key]) {
            userInfoFieldsToUpdate[key] = userInfoData[key];
          }
        });

        await updateDoc(userInfoRef, userInfoFieldsToUpdate);
      } else {
        // If userInfo document does not exist, create a new one with the provided data
        await setDoc(userInfoRef, userInfoData);
      }

      console.log("Profile details updated");
      toast.success("Profile details updated");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Could not update the profile details");
    }
  }

  function changeProfileImage(e) {}

  return (
    <>
      <section className="flex flex-col justify-center items-center px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-3xl text-center mt-6 font-serif">My profile</h1>
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
                placeholder="Name"
              />
              {/*  e-mail */}
              <input
                type="email"
                id="email"
                value={email}
                className="mb-3 w-[50%] px-4 py-2 text-xl text-black bg-white border border-gray-800 rounded transition ease-in-out"
                disabled={!changeDetails}
                onChange={onChange}
                placeholder="Email"
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
                placeholder="Age"
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
                placeholder="Height"
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
                placeholder="Weight"
              />
              <input
                type="number"
                id="workoutExperience"
                value={workoutExperience}
                className="mb-3 w-[50%] px-4 py-2 text-xl text-black bg-white border border-gray-800 rounded transition ease-in-out"
                disabled={!changeDetails}
                onChange={onChange}
                placeholder="Workout Experience"
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
                  changeDetails && onSubmit();
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
          className="w-[50%] mt-4 h-[60px] uppercase font-semibold bg-slate-700 border-spacing-3 rounded-md text-white px-4 py-2 border-2 border-slate-800"
        >
          <Link
            to="/create-workout"
            className="flex justify-center items-center"
          >
            Get your plan
          </Link>
        </button>
      </section>

      <div className="max-w-7xl px-3 mt-6 mx-auto">
        {!loading && workoutplans.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold">
              My workout plans
            </h2>
            <ul className="sm:grid sm:gri-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 border-2">
              {workoutplans.map((plan) => (
                <PlanItems
                  key={plan.id}
                  plan={plan.data}
                  id={plan.id}
                  onDelete={() => onDelete(plan.id)}
                  markAsCompleted={() => markAsCompleted(plan.id)}
                  markAsNotCompleted={() => markAsNotCompleted(plan.id)}
                  completed={plan.completed}
                />
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="max-w-7xl px-3 mt-6 mx-auto">
        {console.log(achievement)}
        <h2 className="text-2xl text-center font-semibold">My Achievements</h2>
        {console.log(achievement)}
        <ul className="sm:grid sm:gri-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 border-1">
          {achievement.map((achievementItem, index) => (
            <AchievementItem
              key={index}
              achievement={achievementItem}
              rewardPlans={rewardPlans}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Profile;
