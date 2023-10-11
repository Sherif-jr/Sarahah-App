import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    let localToken = localStorage.getItem("userToken");
    setLoading(true);
    setUserToken(localToken);
    setLoading(false);
  }, []);

  const login = (token) => {
    setLoading(true);
    setUserToken(token);
    localStorage.setItem("userToken", token);
    setLoading(false);
  };
  const logOut = () => {
    setLoading(true);
    setUserToken(null);
    localStorage.removeItem("userToken");
    setLoading(false);
  };
  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, loading, login, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
