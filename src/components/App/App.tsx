import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from '@layout/MainLayout';
import { ArtistPage } from '@pages/ArtistPage';
import { MainPage } from '@pages/MainPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='/artists/static/:id' element={<ArtistPage />} />
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
