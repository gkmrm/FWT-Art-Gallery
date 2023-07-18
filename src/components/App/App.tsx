import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ThemeProviderComponent } from '@context/ThemeConext';
import { MainPage } from '@pages/MainPage';
import { setupStore } from '@store/store';

import { ArtistPage } from '../../pages/ArtistPage';

const App = () => {
  const [theme, setTheme] = useState<ThemeTypes>('light');
  const store = setupStore();

  return (
    <ThemeProviderComponent value={{ theme, setTheme }}>
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
const App = () => (
  <ThemeProviderComponent>
    <MainPage />
  </ThemeProviderComponent>
);

export default App;
