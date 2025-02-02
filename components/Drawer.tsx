'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useAccessibilityStore from '../store/accessibilityStore';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const { accessibilityMode } = useAccessibilityStore();

  // 햄버거 아이콘 위치(예: Header의 왼쪽 가장자리 근처)에서부터 드로어가 튀어나오듯 슬라이드되도록 설정합니다.
  // closed 상태에서는 x: 0, open 상태에서는 x: 150 (필요에 따라 조정)
  const containerVariants = {
    closed: { x: 40, opacity: 0, scale: 0.95 },
    open: { 
      x: 95, 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      } 
    },
  };

  // 내비게이션 링크들을 수평으로 배치합니다.
  const categories = [
    { name: 'SUPPORT', path: '/help' },
    { name: 'TERMS', path: '/policies/terms-of-service' },
    { name: 'PRIVACY', path: '/policies/privacy-policy' },
    { name: 'ACCESSIBILITY', path: '/accessibility' },
    { name: 'COOKIES', path: '/policies/cookies' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      className="absolute left-0 top-0 h-full flex items-center overflow-hidden"
    >
      <nav>
        <ul className="flex text-md space-x-9">
          {categories.map((cat) => (
            <li
              key={cat.name}
              className={`${accessibilityMode ? 'underline' : ''}`}
            >
              <Link href={cat.path} onClick={onClose}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Drawer;
