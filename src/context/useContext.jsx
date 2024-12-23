import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  userProfile: null,
  setUserProfile: () => {},
});

export const ContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null)

  return (
    <StateContext.Provider
      value={{
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalContext = () => useContext(StateContext);