import React from 'react';

import { Outlet } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { ScrollButton } from '@components/ScrollButton';
import useScrollToTop from '@hooks/useScrollToTop';

export const MainLayout = () => {
  useScrollToTop();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollButton />
    </>
  );
};
