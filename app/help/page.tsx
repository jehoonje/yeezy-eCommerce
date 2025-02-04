'use client';

import React from 'react';

const Help: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center leading-[1.5]">
      <main className="max-w-[660px] py-8 px-9">
        <div className="text-left">
          <p className="mb-10">SUPPORT</p>

          {/* 문단 간 간격 조정 */}
          <p className="mb-10">ALL SALES FINAL</p>
          <p className="mb-10">
            All sales are final due to the low cost of goods. We do not offer returns,
            exchanges, or refunds. Please review your order carefully before completing your
            purchase.
          </p>

          <p className="mb-10">ORDER ISSUES</p>
          <p className="mb-4">
          For any issues with your order (e.g., wrong item or defective product), contact us at help@yeezy.com
          </p>
          <p className="mb-10">
            Please include your order number and details of the issue.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Help;
