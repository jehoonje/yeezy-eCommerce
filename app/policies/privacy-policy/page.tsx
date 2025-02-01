// app/policies/privacy-policy/page.tsx
'use client';

import React from 'react';
import Header from '../../../components/Header';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 p-4">
      <Header />
      <main className="mt-8">
        <div className="max-w-3xl mx-auto text-left">
          <h1 className="text-2xl font-bold mb-4">Privacy policy</h1>
          <p className="mb-4">DO NOT SELL MY INFORMATION</p>
          <p className="mb-4">GDPR Compliance</p>
          <p className="mb-4">Last updated: November 19, 2024</p>
          <p>
            This Privacy Policy describes how Yeezy (the "Site", "we", "us", or "our") collects, uses, and discloses your personal
            information when you visit, use our services, or make a purchase from yeezy-yzy.myshopify.com (the "Site") or otherwise communicate with us
            regarding the Site (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services,
            whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
          </p>
          <p className="mt-4">
            Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your
            information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
          </p>
          {/* --- 이하 생략없이 동일한 내용 추가 --- */}
          {/* 필요한 나머지 섹션들도 동일하게 작성 */}
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
