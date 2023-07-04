import React, { useState } from 'react';

import { Header } from '@components/Header';
import { ThemeProvider, ThemeTypes } from '@hooks/ThemeConext';

const App = () => {
  const [isDarkTheme, setTheme] = useState<ThemeTypes>(false);

  return (
    <ThemeProvider value={{ isDarkTheme, setTheme }}>
      <Header isDarkTheme={isDarkTheme} />
    </ThemeProvider>
  );
};

export default App;
