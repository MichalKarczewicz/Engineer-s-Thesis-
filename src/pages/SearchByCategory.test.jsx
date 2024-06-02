import { searchByCategory } from "./CreateWorkout";

describe("searchByCategory", () => {
  it("should return exercises for a given category", () => {
    const exampleExercises = [
      {
        name: "3/4 Sit-Up",
        force: "pull",
        category: "abs",
      },
      {
        name: "90/90 Hamstring",
        force: "push",
        category: "legs",
      },
      {
        name: "Ab Crunch Machine",
        force: "pull",
        category: "abs",
      },
    ];

    const category = "abs";
    const result = searchByCategory(exampleExercises, category);
    expect(result.some((exercise) => exercise.name === "3/4 Sit-Up")).toBe(
      true
    );
    expect(
      result.some((exercise) => exercise.name === "Ab Crunch Machine")
    ).toBe(true);
    expect(true).toBe(true);
  });
});
