import { createContext, useContext, useState, useEffect } from "react";

const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plantCareHistory, setPlantCareHistory] = useState([]);
  const [daysInRow, setDaysInRow] = useState(0);
  const [weeksInRow, setWeeksInRow] = useState(0);

  const updatePlantCareHistory = (newCareRecord) => {
    setPlantCareHistory((prevHistory) => [...prevHistory, newCareRecord]);
  };

  const resetStreaks = () => {
    setDaysInRow(0);
    setWeeksInRow(0);
  };

  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const timeUntilMidnight = midnight - new Date();

    const resetTimeout = setTimeout(() => {
      resetStreaks();
    }, timeUntilMidnight);

    return () => clearTimeout(resetTimeout);
  }, [plantCareHistory]);

  return (
    <PlantContext.Provider
      value={{
        plantCareHistory,
        updatePlantCareHistory,
        daysInRow,
        weeksInRow,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext = () => {
  return useContext(PlantContext);
};
