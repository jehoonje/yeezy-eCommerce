// app/policies/cookies/page.tsx
'use client';

import React from 'react';
import Header from '../../../components/Header';

const Cookies: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 p-4">
      <Header />
      <main className="mt-8">
        <div className="max-w-2xl mx-auto text-left">
          <h1 className="text-2xl font-bold mb-4">Cookies Policy</h1>
          <p>This is the cookies policy page. Content coming soon.</p>
        </div>
      </main>
    </div>
  );
};

export default Cookies;
