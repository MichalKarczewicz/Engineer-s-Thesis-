import { searchByLevel } from "./CreateWorkout";
describe("searchByLevel", () => {
  it("should return exercises for beginner level", () => {
    const exercises = [
      {
        name: "3/4 Sit-Up",
        force: "pull",
        level: "beginner",
      },
      {
        name: "90/90 Hamstring",
        force: "push",
        level: "beginner",
      },
      {
        name: "Ab Crunch Machine",
        force: "pull",
        level: "intermediate",
      },
    ];
    const level = "beginner";
    const result = searchByLevel(level);

    expect(result.every((exercise) => exercise.level === level)).toBe(true);
    expect(result.some((exercise) => exercise.name === "90/90 Hamstring")).toBe(
      true
    );
    expect(result.some((exercise) => exercise.name === "3/4 Sit-Up")).toBe(
      true
    );
  });
});
