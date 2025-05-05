
import React, { createContext, useContext, useState, useEffect } from "react";

// Default colors as specified
const DEFAULT_COLORS = {
  text: "#234652",
  background: "#ffffff",
  primary: "#09A098",
  secondary: "#94CC3F",
  important: "#D85427"
};

type ColorContextType = {
  colors: typeof DEFAULT_COLORS;
  pendingColors: typeof DEFAULT_COLORS;
  applyColors: () => void;
  resetToDefault: () => void;
  cancelChanges: () => void;
  updateColor: (type: keyof typeof DEFAULT_COLORS, value: string) => void;
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;
  useSystemFont: boolean;
  setUseSystemFont: (use: boolean) => void;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Saved colors that have been applied
  const [colors, setColors] = useState(DEFAULT_COLORS);
  // Temporary colors that may be discarded
  const [pendingColors, setPendingColors] = useState(DEFAULT_COLORS);
  // Logo URL state
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  // System font preference
  const [useSystemFont, setUseSystemFont] = useState(false);

  const applyColors = () => {
    setColors({ ...pendingColors });
  };

  const resetToDefault = () => {
    setPendingColors({ ...DEFAULT_COLORS });
  };

  const cancelChanges = () => {
    setPendingColors({ ...colors });
  };

  const updateColor = (type: keyof typeof DEFAULT_COLORS, value: string) => {
    setPendingColors(prev => ({ ...prev, [type]: value }));
  };

  // Initialize colors from localStorage if available
  useEffect(() => {
    const savedColors = localStorage.getItem("savedColors");
    const savedLogo = localStorage.getItem("savedLogo");
    const savedFontPref = localStorage.getItem("useSystemFont");
    
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      setColors(parsedColors);
      setPendingColors(parsedColors);
    }
    
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }
    
    if (savedFontPref) {
      setUseSystemFont(savedFontPref === "true");
    }
  }, []);

  // Save colors to localStorage when applied
  useEffect(() => {
    localStorage.setItem("savedColors", JSON.stringify(colors));
  }, [colors]);

  // Save logo to localStorage when changed
  useEffect(() => {
    if (logoUrl) {
      localStorage.setItem("savedLogo", logoUrl);
    } else {
      localStorage.removeItem("savedLogo");
    }
  }, [logoUrl]);

  // Save font preference to localStorage
  useEffect(() => {
    localStorage.setItem("useSystemFont", useSystemFont.toString());
  }, [useSystemFont]);

  return (
    <ColorContext.Provider
      value={{
        colors,
        pendingColors,
        applyColors,
        resetToDefault,
        cancelChanges,
        updateColor,
        logoUrl,
        setLogoUrl,
        useSystemFont,
        setUseSystemFont
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  return context;
};
