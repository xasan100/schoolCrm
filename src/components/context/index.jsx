import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [day, setDay] = useState(true);
  const toggleTheme = () => {
    setDay((prevDay) => !prevDay);
  };
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const storedProfile = JSON.parse(sessionStorage.getItem("profile"));
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ day, toggleTheme, profile }}>
      {children}
    </ThemeContext.Provider>
  );
};
