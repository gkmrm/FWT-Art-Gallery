import { createContext, Dispatch, SetStateAction } from 'react';

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

const ThemeProvider = ThemeContext.Provider;

export default ThemeProvider;
