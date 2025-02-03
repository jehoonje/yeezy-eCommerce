// app/accessibility/page.tsx
'use client';

import React from 'react';
import Header from '../../components/Header';
import useAccessibilityStore from '../../store/accessibilityStore';
import { motion } from 'framer-motion';

const Accessibility: React.FC = () => {
  const { accessibilityMode, toggleAccessibility } = useAccessibilityStore();

  return (
    <div className="min-h-screen pt-16 p-4">
      <Header />
      <main className="mt-8">
        <div className="max-w-2xl mx-auto text-left">
          <h1 className="text-3xl font-bold mb-4">Accessibility</h1>
          <p className="mb-4">Enhanced accessibility</p>
          <motion.button
            onClick={toggleAccessibility}
            whileTap={{ scale: 0.9 }}
            className="flex items-center p-2 border rounded focus:outline-none"
          >
            {/* 스위치 아이콘 – accessibilityMode에 따라 색상 및 위치 변경 */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accessibilityMode ? '#4caf50' : '#000'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="4" width="22" height="16" rx="8" ry="8" />
              <circle cx={accessibilityMode ? "16" : "8"} cy="12" r="3" fill={accessibilityMode ? '#4caf50' : '#000'} />
            </svg>
            <span className="ml-2">
              {accessibilityMode ? 'Disable' : 'Enable'} Accessibility Mode
            </span>
          </motion.button>
          <div className="mt-6">
            <p>
              We are committed to making our website accessible to all individuals, including those with disabilities. Our ongoing efforts aim to enhance usability and ensure that our site meets accessibility standards, enabling everyone to navigate and interact with the content comfortably and independently.
            </p>
            <h2 className="text-xl font-bold mt-6 mb-2">Disclaimer</h2>
            <p>
              We continually strive to improve the accessibility of our site and services. However, accessibility is an evolving process, and there may be instances where certain content is not fully optimized. We are working diligently to identify and address any such issues.
            </p>
            <h2 className="text-xl font-bold mt-6 mb-2">Support</h2>
            <p>
              If you encounter any difficulties while using our site or require assistance, please reach out to us, and we will gladly help.
            </p>
            <h2 className="text-xl font-bold mt-6 mb-2">CONTACT</h2>
            <p>
              For questions or to report accessibility issues, please contact our support team via email or mail.
              <br />
              Email: help@yeezy.com
              <br />
              Address: 6 Centerpointe Dr, La Palma, CA 90623
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Accessibility;
