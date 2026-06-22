import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';

export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  setMode: () => {},
});

export const useThemeMode = (): ThemeContextValue => useContext(ThemeContext);

const STORAGE_KEY = 'idira-theme-mode';

function getInitialMode(defaultMode: ThemeMode): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // localStorage unavailable (SSR / private browsing)
  }
  return defaultMode;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'dark',
}) => {
  const [mode, setModeState] = useState<ThemeMode>(() => getInitialMode(defaultMode));

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
