import React, { createContext, useState } from "react";

const UserContext = createContext({
  user: {
    username: JSON.parse(localStorage.getItem("auth"))?.username || null,
    email: JSON.parse(localStorage.getItem("auth"))?.email || null,
  },
  error: null,
  login: () => {},
  loginWithEmail: () => {},
  setError: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: JSON.parse(localStorage.getItem("auth"))?.username || null,
    email: JSON.parse(localStorage.getItem("auth"))?.email || null,
  });
  const [error, setError] = useState(null);

  const login = async (user) => {
    setUser(user);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        username: user?.username || "",
        email: user?.email || "",
      })
    );
  };

  return (
    <UserContext.Provider value={{ user, error, login, setError }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
