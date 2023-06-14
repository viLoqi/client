import React from 'react';
import type { NextPage } from 'next';

import Hero from '@/components/LandingPage/Hero';
import Section2 from '@/components/LandingPage/Section2';
import Login from '@/components/LandingPage/Login';

const MainHome: NextPage = () => {
  return (
    <>
      <Hero />
      <Section2 />
      <Login />
    </>
  );
};

export default MainHome;
