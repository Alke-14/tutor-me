import type { UserData } from "@/models/UserData";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Define variable to keep track of global user data state
  //Initialized to the current value in local storage. If not there, set to null
  const [userDataState, setUserDataState] = useState<UserData | null>(() => {
    const savedData = localStorage.getItem("userData");
    return savedData ? JSON.parse(savedData) : null;
  });

  // Create useEffect block to update localStorage to value in userDataState
  useEffect(() => {
    if (userDataState) {
      localStorage.setItem("userData", JSON.stringify(userDataState));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userDataState]);

  const setUserData = (data: UserData | null) => {
    // will update in local storage as well
    setUserDataState(data);
  };

  const userContextProviderValues = {
    userData: userDataState,
    setUserData,
  };

  return (
    <UserContext.Provider value={userContextProviderValues}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Must be used within UserProvider")
  }
  return context;
};
