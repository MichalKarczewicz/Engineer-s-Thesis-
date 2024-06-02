const searchByLevel = (level) => {
  const matchingElements = [];
  const searchNested = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        searchNested(obj[key]);
      } else if (key === "level" && obj[key] === level) {
        matchingElements.push(obj);
      }
    }
  };
  searchNested(exercises);
  return matchingElements;
};
