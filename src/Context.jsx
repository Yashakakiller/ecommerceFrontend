import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export default function ContextProviderComponent({ children }) {
  const [sharedData, setSharedData] = useState("");

  // Function to update the shared data
  const updateSharedData = (newValue) => {
    setSharedData(newValue);
  };

  return (
    <MyContext.Provider value={{ sharedData, updateSharedData }}>
      {children}
    </MyContext.Provider>
  );
}