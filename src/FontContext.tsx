import { createContext, useContext, useState, type ReactNode } from "react";

type FontContextType = {
  dyslexicFontEnabled: boolean;
  enableFont: () => void;
  disableFont: () => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

type FontProviderProps = {
  children: ReactNode;
};

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [dyslexicFontEnabled, setDyslexicFontEnabled] =
    useState<boolean>(false);

  function enableFont() {
    setDyslexicFontEnabled(true);
  }

  function disableFont() {
    setDyslexicFontEnabled(false);
  }

  const fontContextProviderValues = {
    dyslexicFontEnabled,
    enableFont,
    disableFont,
  };

  return (
    <FontContext.Provider value={fontContextProviderValues}>
      <div
        style={
          dyslexicFontEnabled
            ? { fontFamily: "OpenDyslexic-Regular" }
            : undefined
        }
      >
        {children}
      </div>
    </FontContext.Provider>
  );
};

export const useFont = (): FontContextType => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("FontProvider not provided");
  }
  return context;
};
