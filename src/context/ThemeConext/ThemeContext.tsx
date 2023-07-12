import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

export type ThemeTypes = 'light' | 'dark';

export interface ThemeProps {
  theme: ThemeTypes;
  setTheme: Dispatch<SetStateAction<ThemeTypes>>;
}

export const themeDefaultValue: ThemeProps = {
  theme: 'light',
  setTheme: () => true,
};

export const ThemeContext = createContext<ThemeProps>(themeDefaultValue);

export const ThemeProvider = ThemeContext.Provider;

type TThemePRoviderComponent = {
  children: React.ReactNode;
};

const ThemeProviderComponent: React.FC<TThemePRoviderComponent> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeTypes>('light');

  return <ThemeProvider value={{ theme, setTheme }}>{children}</ThemeProvider>;
};

export default ThemeProviderComponent;
