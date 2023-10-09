import { createContext, useContext, useState } from 'react';
const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [day, setDay] = useState(true);

    const toggleTheme = () => {
        setDay(prevDay => !prevDay);
    };

    return (
        <ThemeContext.Provider value={{ day, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};