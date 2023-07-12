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
  const [theme, setTheme] = useState<ThemeType>('light');

  return <ThemeProvider value={{ theme, setTheme }}>{children}</ThemeProvider>;
};

export default ThemeProviderComponent;
