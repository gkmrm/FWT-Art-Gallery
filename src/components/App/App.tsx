import React from 'react';

import { ThemeProviderComponent } from '@context/ThemeConext';
import { MainPage } from '@pages/MainPage';

const App = () => (
  <ThemeProviderComponent>
    <MainPage />
  </ThemeProviderComponent>
);

export default App;
