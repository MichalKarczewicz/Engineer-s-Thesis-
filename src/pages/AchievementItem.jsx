import React from "react";
import { CgGym } from "react-icons/cg";
import { MdSportsGymnastics } from "react-icons/md";

const AchievementItem = ({ achievement }) => {
  return (
    <div>
      <div
        className={`w-full bg-slate-700 shadow-lg h-full mb-6 text-white pt-6 pb-6 border-spacing-3 rounded-md px-4 py-2 border-4 border-slate-800`}
      >
        <div className="border-2 py-4 px-4 w-full h-full">
          <p className="text-xl font-bold mb-2 text-center uppercase">
            {achievement.name}
          </p>
          <div
            className={`mx-auto my-auto py-2 px-2 w-[50px] h-[50px] rounded-full ${achievement.color}`}
          >
            {achievement.description.includes("created") ? (
              <CgGym className="text-4xl" />
            ) : (
              <MdSportsGymnastics className="text-4xl" />
            )}
          </div>
          <p className="text-md font-bold mb-4 text-center my-4">
            {achievement.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementItem;
