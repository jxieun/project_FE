import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("#ffffff");

  const gradient = `linear-gradient(135deg, ${themeColor}, #ffffff)`; // 밝은 그라데이션

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, gradient }}>
      {children}
    </ThemeContext.Provider>
  );
};
