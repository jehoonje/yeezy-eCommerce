import React, { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import useAccessibilityStore from '../store/accessibilityStore';

interface HeaderProps {
  onToggleDrawer?: () => void;
  isDrawerOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleDrawer }) => {
  const router = useRouter();
  const { accessibilityMode } = useAccessibilityStore();
  
  const [isMainPage, setIsMainPage] = useState<boolean>(router.pathname === '/');

  useEffect(() => {
    setIsMainPage(router.pathname === '/');
  }, [router.pathname]);

  const handleHamburgerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isMainPage) {
      router.back();
    } else {
      onToggleDrawer && onToggleDrawer();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex justify-between items-center px-4 h-16">
      <div className="flex items-center">
        <button
          onClick={handleHamburgerClick}
          className={`p-2 focus:outline-none ${accessibilityMode ? 'bg-[#dadada]' : ''}`}
        >
          <AnimatePresence>
            {isMainPage ? (
              <motion.div key="hamburger" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* 기본 햄버거 아이콘 */}
                <svg
                  width="28"
                  height="20"
                  viewBox="0 0 28 20"
                  fill="none"
                  stroke="#000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 4H26" strokeWidth="2" strokeLinecap="round" />
                  <path d="M2 10H26" strokeWidth="2" strokeLinecap="round" />
                  <path d="M2 16H26" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            ) : (
              <motion.div key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* 뒤로가기 아이콘 */}
                <svg
                  width="28"
                  height="20"
                  viewBox="0 0 28 20"
                  fill="none"
                  stroke="#000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 2L8 10L20 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <button className="ml-4 p-2 focus:outline-none">
          {/* + 아이콘 (추후 기능 구현 예정) */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
      <div>
        <button className={`p-2 focus:outline-none ${accessibilityMode ? 'bg-[#dadada]' : ''}`}>
          {/* 장바구니 아이콘 */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
