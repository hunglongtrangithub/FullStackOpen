import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.content;
    case "CLEAR_NOTIFICATION":
      return "";
  }
};

const Context = createContext();

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, "");

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
