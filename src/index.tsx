import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@components/App';
import { AuthProvider } from '@context/AuthContext';
import { FilterContext } from '@context/FilterContext';
import { ThemeProvider } from '@context/ThemeContext';
import { setupStore } from '@store/store';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore();

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Provider store={store}>
          <BrowserRouter>
            <FilterContext>
              <App />
            </FilterContext>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
