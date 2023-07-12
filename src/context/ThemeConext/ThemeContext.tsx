import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

export type ThemeType = 'light' | 'dark';

export interface ThemeProps {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const themeDefaultValue: ThemeProps = {
  theme: 'light',
  setTheme: () => 'light',
};

export const ThemeContext = createContext<ThemeProps>(themeDefaultValue);

export const ThemeProvider = ThemeContext.Provider;

const getTheme = (): ThemeType => {
  let themeLocalStorage = localStorage.getItem('theme');

  if (!themeLocalStorage) {
    localStorage.setItem('theme', 'light');
    themeLocalStorage = 'light';
  }

  return themeLocalStorage === 'light' ? 'light' : 'dark';
};

type TThemePRoviderComponent = React.HTMLAttributes<HTMLDivElement>;

const ThemeProviderComponent: React.FC<TThemePRoviderComponent> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>(getTheme);

  localStorage.setItem('theme', theme);

  return <ThemeProvider value={{ theme, setTheme }}>{children}</ThemeProvider>;
};

export default ThemeProviderComponent;
