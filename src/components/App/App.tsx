import React from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AuthModal } from '@components/AuthModal';
import { MainLayout } from '@layout/MainLayout';
import { ArtistPage } from '@pages/ArtistPage';
import { MainPage } from '@pages/MainPage';

const App = () => {
  const location = useLocation();
  const background = location.state ? location.state.background : null;

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path='/artists/static/:id' element={<ArtistPage />} />
          <Route path='/login' element={<AuthModal variant='login' />} />
          <Route path='/signup' element={<AuthModal variant='signup' />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='login' element={<AuthModal variant='login' />} />
          <Route path='signup' element={<AuthModal variant='signup' />} />
        </Routes>
      )}
    </>
  );
};

export default App;
