import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  destination: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH": {
      return action.payload;
    }
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  // Convert the destination value to lowercase for comparison
  const destinationLowerCase = state.destination?.toLowerCase();

  return (
    <SearchContext.Provider
      value={{
        city: destinationLowerCase, // Use the lowercase version for comparison
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
