import React, { useState } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ThemeProvider, ThemeTypes } from '@hooks/ThemeConext';

import { MainPage } from '../../pages/MainPage';

const App = () => {
  const [theme, setTheme] = useState<ThemeTypes>('light');

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
