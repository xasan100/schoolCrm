import React, { createContext, useEffect, useState } from "react";

export const Authentication = createContext();

export default function AuthContext({ children }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const sotredProfile = JSON.parse(sessionStorage.getItem("profile"));
    if (sotredProfile) {
      setProfile(sotredProfile);
    }
  }, []);

  return (
    <Authentication.Provider value={{ profile }}>
      {children}
    </Authentication.Provider>
  );
}
