import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

export type ThemeType = 'light' | 'dark';

export type ThemeProps = {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
};

export const themeDefaultValue: ThemeProps = {
  theme: 'light',
  setTheme: () => 'light',
};

export const ThemeContext = createContext<ThemeProps>(themeDefaultValue);

const getTheme = (): ThemeType => {
  let themeLocalStorage = localStorage.getItem('theme');

  if (!themeLocalStorage) {
    localStorage.setItem('theme', 'light');
    themeLocalStorage = 'light';
  }

  return themeLocalStorage === 'light' ? 'light' : 'dark';
};

type TThemeProvider = React.HTMLAttributes<HTMLDivElement>;

const ThemeProvider: React.FC<TThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(getTheme);

  localStorage.setItem('theme', theme);

  const themeValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
