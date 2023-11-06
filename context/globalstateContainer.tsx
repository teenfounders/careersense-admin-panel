"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

// Define the state and actions types
type State = {
  index: string;
};

type Action =
  | { type: "SET_INDEX"; payload: string }
  | { type: "MOVE_TO_NEXT_SECTION" };

// Initial state with 'index' as string
const initialState: State = {
  index: "workexperience", // Initial value is a string
};

// Create context and provider
type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const GlobalStateContext = createContext<ContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer((prevState: State, action: Action) => {
    switch (action.type) {
      case "SET_INDEX":
        return { ...prevState, index: action.payload };
      default:
        return prevState;
    }
  }, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
