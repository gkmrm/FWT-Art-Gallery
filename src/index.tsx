import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from '@components/App';
import { ThemeProvider } from '@context/ThemeConext';
import { setupStore } from '@store/store';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore();

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
