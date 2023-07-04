import { createContext, Dispatch, SetStateAction } from 'react';

export type ThemeTypes = boolean;

export interface ThemeProps {
  isDarkTheme: ThemeTypes;
  setTheme: Dispatch<SetStateAction<ThemeTypes>>;
}

export const themeDefaultValue: ThemeProps = {
  isDarkTheme: false,
  setTheme: () => true,
};

export const ThemeContext = createContext<ThemeProps>(themeDefaultValue);

const ThemeProvider = ThemeContext.Provider;

export default ThemeProvider;
