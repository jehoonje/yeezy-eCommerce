// app/accessibility/page.tsx
"use client";

import React from "react";
import useAccessibilityStore from "../../store/accessibilityStore";
import { motion } from "framer-motion";

const Accessibility: React.FC = () => {
  const { accessibilityMode, toggleAccessibility } = useAccessibilityStore();

  return (
    <div className="min-h-screen flex justify-center leading-[1.5]">
      <main className="max-w-[660px] mt-[40px] py-10 px-9">
        <div className="text-left">
          <p className="mb-10">ACCESSIBILITY</p>
          <div className="flex justify-between">
            <p className="mb-4">ENHANCED ACCESSIBILITY</p>
            <motion.button
              onClick={toggleAccessibility}
              whileTap={{ scale: 0.9 }}
              className="flex p-2 border-none rounded focus:outline-none"
            >
              {/* 스위치 아이콘 – accessibilityMode에 따라 색상 및 위치 변경 */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill={accessibilityMode ? "#000" : "#f5f5f5"}
                stroke={accessibilityMode ? "#000" : "#000"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="28" height="16" rx="8" ry="8" />

                {/* 애니메이션이 적용된 원 */}
                <motion.circle
                  animate={{
                    cx: accessibilityMode ? 22 : 10, // 원의 위치 변경
                  }}
                  transition={{ type: "spring", stiffness: 800, damping: 40 }} // 애니메이션 설정
                  cy="12"
                  r="3"
                  stroke={accessibilityMode ? "#fff" : "#000"}
                  fill={accessibilityMode ? "#fff" : "#000"}
                  strokeWidth="3"
                />
              </svg>
            </motion.button>
          </div>
          <div className="mt-6">
            <p>
              We are committed to making our website accessible to all
              individuals, including those with disabilities. Our ongoing
              efforts aim to enhance usability and ensure that our site meets
              accessibility standards, enabling everyone to navigate and
              interact with the content comfortably and independently.
            </p>
            <h2 className="mt-6 mb-8">DISCLAIMER</h2>
            <p>
              We continually strive to improve the accessibility of our site and
              services. However, accessibility is an evolving process, and there
              may be instances where certain content is not fully optimized. We
              are working diligently to identify and address any such issues.
            </p>
            <h2 className="mt-6 mb-4">SUPPORT</h2>
            <p>
              If you encounter any difficulties while using our site or require
              assistance, please reach out to us, and we will gladly help.
            </p>
            <h2 className="mt-6 mb-4">CONTACT</h2>
            <p className="mb-20">
              For questions or to report accessibility issues, please contact
              our support team via email or mail.<br />
              <br />
              Email: help@yeezy.com
              <br />
              Address: 6 Centerpointe Dr,
              <br />
              La Palma, CA 90623
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Accessibility;
