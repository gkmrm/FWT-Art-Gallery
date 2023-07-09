import React, { useState } from 'react';

import { ThemeProvider, ThemeTypes } from '@hooks/ThemeConext';

import { MainPage } from '../../pages/MainPage';

const App = () => {
  const [theme, setTheme] = useState<ThemeTypes>('light');

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
