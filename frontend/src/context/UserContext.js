import React, { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
  const { authenticated, loading, register, login, logout, forgotPass,  resetPass } = useAuth();

  return (
    <Context.Provider
      value={{ loading, authenticated, register, login, logout, forgotPass,  resetPass }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
