import React from "react";
import { Link } from "react-router-dom";

function PlanItem({ plan, id }) {
  return (
    <li className="relative">
      <Link to={`/${id}`}>
        <div>
          {plan.slice(0, 1).map((exercise, key) => (
            <div className="px-3" key={key}>
              <p>{exercise.name}</p>
            </div>
          ))}
        </div>
      </Link>
    </li>
  );
}

export default PlanItem;
