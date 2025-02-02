// app/page.tsx
'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Drawer from '../components/Drawer';

const Home: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="min-h-screen pt-16">
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to the E-commerce Site</h1>
        <p>Main content goes here.</p>
      </main>
    </div>
  );
};

export default Home;

