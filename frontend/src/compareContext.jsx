import React, { createContext, useContext, useState } from "react";

const CompareContext = createContext();

// Custom hook to use the CompareContext easily
export const useCompare = () => useContext(CompareContext);

// Provider component to wrap your app and provide the context
export const CompareProvider = ({ children, limit = 2 }) => {
  const [ids, setIds] = useState([]);

  // toggle add/remove property id for comparison
  const toggle = (id) => {
    setIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id) // remove id if exists
          : prev.length < limit
          ? [...prev, id] // add id if limit not reached
          : prev // ignore if limit reached
    );
  };

  return (
    <CompareContext.Provider value={{ ids, toggle }}>
      {children}
    </CompareContext.Provider>
  );
};
