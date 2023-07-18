import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@context/ThemeConext';
import { MainPage } from '@pages/MainPage';
import { setupStore } from '@store/store';

import { ArtistPage } from '../../pages/ArtistPage';

const App = () => {
  const store = setupStore();

  return (
    <ThemeProvider>
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
