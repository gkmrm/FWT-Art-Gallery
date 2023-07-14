import React, { useState } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ThemeProvider, ThemeTypes } from '@hooks/ThemeConext';
import { setupStore } from '@store/store';

import { ArtistPage } from '../../pages/ArtistPage';
import { MainPage } from '../../pages/MainPage';

const App = () => {
  const [theme, setTheme] = useState<ThemeTypes>('light');
  const store = setupStore();

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/artists/static'>
              <Route path=':id' element={<ArtistPage />} />
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
