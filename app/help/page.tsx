// app/help/page.tsx
'use client';

import React from 'react';
import Header from '../../components/Header';

const Help: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 p-4">
      <Header />
      <main className="mt-8">
        <div className="max-w-2xl mx-auto text-left">
          <h1 className="text-3xl font-bold mb-4">HELP</h1>
          <h2 className="text-xl font-semibold mb-2">ALL SALES FINAL</h2>
          <p className="mb-4">
            All sales are final due to the low cost of goods. We do not offer returns,
            exchanges, or refunds. Please review your order carefully before completing your
            purchase.
          </p>
          <h2 className="text-xl font-semibold mb-2">ORDER ISSUES</h2>
          <p>
            For any issues with your order (e.g., wrong item or defective product), contact us
            at help@yeezy.com
            <br />
            Please include your order number and details of the issue.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Help;
